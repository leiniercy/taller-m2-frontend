"use client"

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Galleria} from 'primereact/galleria';

const ColletionsImages = (props) => {

    const [files, setFiles] = useState(props.images);

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
        />
    }

    return (
            <Galleria
                className="bg-gray-items h-20rem sm:h-20rem w-12 sm:w-12 md:w-12 lg:w-10 xl:w-8"
                // style={{width: '640px'}}
                value={files}
                responsiveOptions={responsiveOptions}
                numVisible={3}
                circular={true}
                showItemNavigators
                showItemNavigatorsOnHover
                item={itemTemplate}
                showThumbnails={false}
                showIndicators
            />
    )
}
ColletionsImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ColletionsImages;
