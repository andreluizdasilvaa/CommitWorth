"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProps {
    login: string;
    name: string;
    avatar_url: string;
}

type UserContextType = {
    user: UserProps | null;
    setDataUser: (user: UserProps | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [totalStars, setTotalStars] = useState(0)
    const [totalRepos, setTotalRepos] = useState(0)
    const [totalCommits, setTotalCommits] = useState(0)

    const [addedValue, setAddedValue] = useState(0)
    const [mostUsedLanguages, setMostUsedLanguages] = useState([])
    const [points, setPoints] = useState(0)
    const [popularContributions, setPopularContributions] = useState([])
    
    const [totalForks, setTotalForks] = useState(0)
    const [totalEmployees, setTotalEmployees] = useState(0)
    const [ranking, setRanking] = useState(0)


    async function setDataUser(data: UserProps | null) {
        setUser(data)
        
    }

    return (
        <UserContext.Provider value={{ user, setDataUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser deve ser usado dentro de um UserProvider');
    }
    return context;
};