import * as React from 'react';
import { XYPair } from './utils';

export interface DragSharedInfo {
    dragStartHandler: DragStartFn;
    offsetMap: {
        [draggableId: string]: XYPair;
    };
}

export type DragStartFn = (draggableId: string, ev: React.MouseEvent<HTMLDivElement>) => void;

interface StringContextMap {
    [key: string]: React.Context<DragSharedInfo | undefined>;
}

export class DragContextProvider {
    private static idContextMap: StringContextMap = {

    };

    public static get(id: string): React.Context<DragSharedInfo | undefined> {
        if (this.has(id)) {
            return this.idContextMap[id];
        } else {
            const newContext = React.createContext(undefined);
            this.idContextMap[id] = newContext;

            return newContext;
        }
    }

    public static has(id: string): boolean {
        return (id in this.idContextMap);
    }
}