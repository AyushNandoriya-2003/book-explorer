import { Icon as Iconify } from '@iconify/react'
import type { IconProps } from '@iconify/react'

const Icon = ({ icon, ...rest }: IconProps) => {
    return (
        <Iconify icon={icon} fontSize='1.5rem' {...rest} />
    )
}

export default Icon
