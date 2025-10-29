'use client'

import { useState, useEffect } from 'react'
import { Button } from "@nextui-org/react"
import Link from "next/link"
import { TbDownload } from "react-icons/tb"

export default function NightlyDownload() {
    const [countdown, setCountdown] = useState(10)
    const [isButtonEnabled, setIsButtonEnabled] = useState(false)
    // Get the destination URL from environment variable with fallback
    const destinationUrl = process.env.NEXT_PUBLIC_NIGHTLY_DOWNLOAD_URL

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

                    {/* Download Button */}
                    <div className="mb-8">
                        <Button
                            rel="noopener noreferrer"
                            target="_blank"
                            href={destinationUrl}
                            as={Link}
                            color="primary"
                            size="lg"
                            radius="md"
                            endContent={<TbDownload />}
                            isDisabled={!isButtonEnabled}
                            className={`${isButtonEnabled ? 'animate-pulse' : ''}`}
                        >
                            <p className="font-semibold">
                                {isButtonEnabled ? 'Download Now' : 'Please Wait...'}
                            </p>
                        </Button>
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
