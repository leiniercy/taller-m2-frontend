"use client"

import React, {useState, useEffect} from 'react';
import {Galleria} from 'primereact/galleria';

export default function ColletionsImages(props) {

    const [images, setImages] = useState(props.images);

    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item) => {
        return <img className="h-20rem sm:h-20rem w-full  border-round "
                    src={item.url}
                    alt={item.name}
            // style={{ height: '640px', width: '640px' }}
        />
    }

    const thumbnailTemplate = (item) => {
        return <img className="" src={item.url} alt={item.name} style={{height: '100px', display: 'block'}}/>
    }

    return (
            <Galleria
                className="bg-gray-items h-20rem sm:h-20rem w-12 sm:w-12 md:w-12 lg:w-10 xl:w-8"
                // style={{width: '640px'}}
                value={images}
                responsiveOptions={responsiveOptions}
                numVisible={3}
                circular={true}
                showItemNavigators
                showItemNavigatorsOnHover
                item={itemTemplate}
                // showIndicatorsOnItem={true}
                showThumbnails={false}
                showIndicators
                // thumbnailsPosition={'left'}
                //       thumbnail={thumbnailTemplate}
            />
    )
}
