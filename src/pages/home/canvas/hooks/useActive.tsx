
import { useState } from 'react'

const useActive = () => {
    const [active, setActive] = useState<boolean>();

    const toggleActive = (): void => {
        setActive((prevActive) => !prevActive);
    }
    return {active, toggleActive};
}

export default useActive;