"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { useUser } from "@/context/User"
import { api } from "@/lib/api"
import {
    Star,
    Box,
    GitCommit
} from 'lucide-react'

import { Container } from "@/components/container"
import { ButtonGithub } from "./components/buttonGithub"
import { Modal } from "./components/modal"
import { LoadingScreen } from "./components/loadingScreen"
import { CardInfoUserSmall } from "./components/cardInfoUserSmall" 

import { UserProps } from "@/context/User"

export default function UserDeitais() {
    const { setDataUser, user } = useUser()
    const searchParams = useSearchParams()
    const userParam = searchParams.get("user")

    const [modalVisible, setModalVisible] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const loadData = async () => {
            if (!userParam) {
                setModalVisible(true)
                setLoading(false)
                return
            }

            try {
                const response = await api.get(`/${userParam}`)
                setDataUser(response.data)
                setModalVisible(false)
                await loadDataUser(response.data)
            } catch (error) {
                setModalVisible(true)
                setLoading(false)
            }
        }

        loadData()
    }, [searchParams])


    async function loadDataUser(data: UserProps) {
        console.log(data)
        // pega todos os

        setLoading(false)
    }

    return (
        <Container>
            <div className="flex flex-wrap justify-between items-end">
                {modalVisible && <Modal />}
                {loading && <LoadingScreen />}

                {user && (
                    <>
                        <ButtonGithub />
                        <div className="flex gap-4 items-center max-sm:ml-auto">
                            <div>
                                <h2 className="text-primarybege font-inter text-4xl font-black">
                                    {user.name
                                        ? user.name.length > 16
                                            ? user.name.slice(0, 16) + '...'
                                            : user.name
                                        : user.login}
                                </h2>
                                <p className="text-primarybege font-medium">@{user.login}</p>
                            </div>

                            <Image
                                src={user.avatar_url}
                                alt={`Avatar do ${user.name}`}
                                width={120}
                                height={120}
                                className="rounded-full"
                            />

                        </div>
                    </>
                )}
            </div>

            {user && (
                <div className="w-full flex items-center justify-around flex-wrap gap-6 mt-8">
                    <CardInfoUserSmall 
                        Icon={Star}
                        title="Total de estrelas"
                        value=""
                    />
                    <CardInfoUserSmall 
                        Icon={Box}
                        title="Total de Repositorios"
                        value=""
                    />
                    <CardInfoUserSmall 
                        Icon={GitCommit}
                        title="Total de Commits"
                        value=""
                    />
                </div>
            )}

        </Container>
    )
}