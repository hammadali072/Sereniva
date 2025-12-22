import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted user on mount
        const storedUser = localStorage.getItem('sereniva_user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login - in a real app this would hit an API
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    let user = {
                        name: "Jane Doe",
                        email: email,
                        avatar: "https://i.pravatar.cc/150?u=sereniva",
                        role: "user"
                    };

                    // Mock Role Logic
                    if (email.includes("admin")) {
                        user.name = "Admin User";
                        user.role = "admin";
                    } else if (email.includes("therapist")) {
                        user.name = "Sarah Therapist";
                        user.role = "therapist";
                    }

                    setCurrentUser(user);
                    localStorage.setItem('sereniva_user', JSON.stringify(user));
                    resolve(user);
                } else {
                    reject(new Error("Invalid credentials"));
                }
            }, 800);
        });
    };

    const signup = (userData, password) => {
        // Mock signup
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userData.firstName && userData.lastName && userData.email && password) {
                    const user = {
                        ...userData,
                        name: `${userData.firstName} ${userData.lastName}`,
                        avatar: "https://i.pravatar.cc/150?u=" + userData.email
                    };
                    setCurrentUser(user);
                    localStorage.setItem('sereniva_user', JSON.stringify(user));
                    resolve(user);
                } else {
                    reject(new Error("Missing fields"));
                }
            }, 800);
        });
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('sereniva_user');
    };

    const value = {
        currentUser,
        login,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
