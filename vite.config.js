import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import Stripe from 'stripe'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env vars regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: '0.0.0.0'
    },
    plugins: [
      react(),
      {
        name: 'stripe-backend',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/create-checkout-session' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                try {
                  // Get the key from env or process.env
                  const secretKey = env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;

                  if (!secretKey) {
                    throw new Error("STRIPE_SECRET_KEY is missing from .env file or environment variables.");
                  }

                  const stripe = new Stripe(secretKey);
                  const data = JSON.parse(body);

                  // Use the origin from the request to build absolute return URLs
                  const origin = req.headers.origin || 'http://localhost:5173';

                  const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                      {
                        price_data: {
                          currency: 'usd',
                          product_data: {
                            name: data.service,
                            description: `Wellness session for ${data.name}`,
                          },
                          unit_amount: Math.round(data.amount * 100),
                        },
                        quantity: 1,
                      },
                    ],
                    mode: 'payment',
                    // Redirect back to profile on success
                    success_url: `${origin}/profile?session_id={CHECKOUT_SESSION_ID}&apt_id=${data.appointmentId}`,
                    cancel_url: `${origin}/appointment?cancelled=true`,
                    metadata: {
                      appointmentId: data.appointmentId,
                      userId: data.userId
                    }
                  });

                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ url: session.url }));
                } catch (error) {
                  console.error("Stripe Backend Error:", error.message);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: error.message }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
  }
})
