'use client'

import { useState, useEffect } from 'react'
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react"
import { TbDownload, TbChevronDown } from "react-icons/tb"
import { FaAndroid, FaWindows, FaLinux, FaApple } from "react-icons/fa"

export default function NightlyDownload() {
    const [countdown, setCountdown] = useState(10)
    const [isButtonEnabled, setIsButtonEnabled] = useState(false)
    
    // Download URLs for different platforms
    const downloadUrls = {
        android: process.env.NEXT_PUBLIC_NIGHTLY_DOWNLOAD_ANDROID_URL || '#',
        windows: process.env.NEXT_PUBLIC_NIGHTLY_DOWNLOAD_WINDOWS_URL || '#',
        linuxDeb: process.env.NEXT_PUBLIC_NIGHTLY_DOWNLOAD_LINUX_DEB_URL || '#',
        linuxRpm: process.env.NEXT_PUBLIC_NIGHTLY_DOWNLOAD_LINUX_RPM_URL || '#',
        linuxAppImage: process.env.NEXT_PUBLIC_NIGHTLY_DOWNLOAD_LINUX_APPIMAGE_URL || '#',
        macos: process.env.NEXT_PUBLIC_NIGHTLY_DOWNLOAD_MACOS_URL || '#'
    }
    
    // Platform configurations
    const platforms = [
        {
            name: 'Android',
            icon: FaAndroid,
            url: downloadUrls.android,
            color: 'success',
            chipColor: 'success',
            description: 'APK for Android devices',
            fileType: '.apk'
        },
        {
            name: 'Windows',
            icon: FaWindows,
            url: downloadUrls.windows,
            color: 'primary',
            chipColor: 'primary',
            description: 'Installer for Windows',
            fileType: '.msi'
        },
        {
            name: 'Linux (Deb)',
            icon: FaLinux,
            url: downloadUrls.linuxDeb,
            color: 'warning',
            chipColor: 'warning',
            description: 'Deb package - x86_64 only',
            fileType: '.deb'
        },
        {
            name: 'Linux (Rpm)',
            icon: FaLinux,
            url: downloadUrls.linuxRpm,
            color: 'warning',
            chipColor: 'warning',
            description: 'Rpm package - x86_64 only',
            fileType: '.rpm'
        },
        {
            name: 'Linux (AppImage)',
            icon: FaLinux,
            url: downloadUrls.linuxAppImage,
            color: 'warning',
            chipColor: 'warning',
            description: 'AppImage - x86_64 only',
            fileType: '.AppImage'
        },
        {
            name: 'macOS',
            icon: FaApple,
            url: downloadUrls.macos,
            color: 'default',
            chipColor: 'default',
            description: 'Installer for macOS',
            fileType: '.dmg'
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    // Enable button after countdown
                    setIsButtonEnabled(true)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <section className="download-section">
            <div className="relative isolate px-6 py-20 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80e6ff] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    ></div>
                </div>
                <div className="mx-auto max-w-2xl text-center py-32 sm:py-48 lg:py-56">
                    <div className="mb-8">
                        {/* Title */}
                        <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl pb-4 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
                            SimpMusic Nightly
                        </h2>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-8">
                            Preparing your download...
                        </h4>
                    </div>

                    {/* Countdown Display */}
                    <div className="mb-8">
                        <div className="relative w-40 h-40 mx-auto">
                            {/* Circular Progress */}
                            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                    className="text-gray-300 dark:text-gray-600"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="text-gradientstart"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeDasharray={`${((10 - countdown) / 10) * 100}, 100`}
                                    strokeLinecap="round"
                                    fill="none"
                                    d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>

                            {/* Countdown Number */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gradientstart to-gradientend">
                                    {countdown === 0 ? '🚀' : countdown}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Status Text */}
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        {countdown === 0
                            ? 'Ready to download!'
                            : `Please wait ${countdown} second${countdown !== 1 ? 's' : ''}...`
                        }
                    </p>

                    {/* Download Button with Dropdown */}
                    <div className="mb-8">
                        <Dropdown placement="bottom" isDisabled={!isButtonEnabled}>
                            <DropdownTrigger>
                                <Button
                                    color="primary"
                                    size="lg"
                                    radius="lg"
                                    isDisabled={!isButtonEnabled}
                                    startContent={<TbDownload className="text-xl" />}
                                    endContent={<TbChevronDown className="text-xl" />}
                                    className={`${isButtonEnabled ? 'animate-pulse' : ''} font-semibold px-8`}
                                >
                                    {isButtonEnabled ? 'Download Now' : 'Please Wait...'}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Download platforms"
                                variant="flat"
                                onAction={(key) => {
                                    const platform = platforms.find(p => p.name.toLowerCase() === key)
                                    if (platform && platform.url) {
                                        window.open(platform.url, '_blank', 'noopener,noreferrer')
                                    }
                                }}
                            >
                                {platforms.map((platform) => {
                                    const Icon = platform.icon
                                    return (
                                        <DropdownItem
                                            key={platform.name.toLowerCase()}
                                            startContent={<Icon className="text-xl" />}
                                            description={platform.description}
                                        >
                                            {platform.name}
                                        </DropdownItem>
                                    )
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    {/* Security Notice */}
                    <p className="text-sm text-gray-500/80">
                        🔒 This is a secure download from SimpMusic
                    </p>
                </div>
            </div>
        </section>
    )
}
