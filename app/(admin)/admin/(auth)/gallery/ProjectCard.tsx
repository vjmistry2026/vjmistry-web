import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const GalleryCard = ({ item, id }: { item: { item: string, _id: string }, id: string }) => {
    const { attributes, listeners, setNodeRef, transform } = useSortable({
        id,
    })
    const style = {
        transition: 'transform 0.2s ease-in-out',
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div ref={setNodeRef} style={style} className='flex items-center justify-between border border-black/20 p-2 rounded-md' {...attributes} {...listeners} key={item._id}>
            <div>
                <p className="text-[16px]">{item.item}</p>
            </div>
        </div>
    )
}

export default GalleryCard