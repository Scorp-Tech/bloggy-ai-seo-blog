"use client"

import { JSX } from "react"

interface HeaderTitleProps{
    title: string,
    subTitle?: string,
    children?: JSX.Element
}

export function HeaderTitle({ title, subTitle, children }: HeaderTitleProps) {
    return (
       <div className="w-full flex justify-between mb-5">
        <h1 className="text-2xl font-publicSans font-extrabold dark:text-white">
            {title}
            {subTitle && <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">{subTitle}</small>}
        </h1>
        {children && children}
       </div>
    )
}
