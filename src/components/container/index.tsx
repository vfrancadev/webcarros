import type { ReactNode } from 'react'

export function Container({children}: {children: ReactNode}) {

    return(
        <div className="w-full max-auto px-4">
            {children}

        </div>
    )
}