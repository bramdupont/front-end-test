'use client'

import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

type ToastProps = {
    title: string;
    message: string;
    type: 'success' | 'error';
}

export const Toast = (props: ToastProps) => {
    const { title, message, type } = props
    const [show, setShow] = useState(true)

    return (
        <>
            <div
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition show={show}>
                        <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-neutral-800 shadow-lg outline-1 -outline-offset-1 outline-white/10 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="shrink-0">
                                        {type === 'success' && <CheckCircleIcon aria-hidden="true" className="size-6 text-green-400" />}
                                        {type === 'error' && <XMarkIcon aria-hidden="true" className="size-6 text-red-400" />}
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        {title && (
                                            <p className="text-sm font-medium text-white">{title}</p>
                                        )}
                                        {message && (
                                            <p className="mt-1 text-sm text-gray-400">{message}</p>
                                        )}
                                    </div>
                                    <div className="ml-4 flex shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShow(false)
                                            }}
                                            className="inline-flex rounded-md text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary cursor-pointer"
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon aria-hidden="true" className="size-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}
