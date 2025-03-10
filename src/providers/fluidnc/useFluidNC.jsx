import { useContext } from 'react';
import { FluidNCContext } from './FluidNCProvider';

export default function useFluidNC() {
    return useContext(FluidNCContext);
}
