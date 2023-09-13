
import React from "react";
import PropTypes from 'prop-types';
import {FileUpload} from "primereact/fileupload";
import {Galleria} from "primereact/galleria";

const SelectBoxImages = (props) => {

    const chooseOptions = {
        icon: 'pi pi-fw pi-images',
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined w-full'
    };/*Drag and Drop options (image)*/
    const itemTemplate = (item) => {
        if(props.imageSelected){
            return <img className="h-20rem sm:h-20rem w-full  border-round"
                        alt={item.name} role="presentation" src={item.objectURL}/>;
        }
        return <img className="h-20rem sm:h-20rem w-full  border-round" src={process.env.NEXT_PUBLIC_API_URL+'/product/image/'+item.name} alt={item.name}/>
    }

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

    return(<>
        <FileUpload
            name="files"
            accept="image/*"
            multiple
            customUpload={true}
            className="p-mr-2"
            maxFileSize={1000000}
            mode="basic"
            onSelect={props.onTemplateSelect}
            chooseOptions={chooseOptions}
        />
        {props.submitted && !props.object.files && <small className="p-error">Campo obligatorio.</small>}
        {(!props.imageSelected && !props.editActive) && <div className="mt-2 flex align-items-center flex-column">
            <i className="pi pi-image mt-3 p-5" style={{
                fontSize: '5em',
                borderRadius: '50%',
                backgroundColor: 'var(--surface-b)',
                color: 'var(--surface-d)'
            }}></i>
        </div>}
        {(props.imageSelected || props.editActive) && <Galleria
            className="mt-2 bg-gray-items w-full h-25rem sm:h-25rem"
            value={props.object.files}
            responsiveOptions={responsiveOptions}
            numVisible={3}
            circular={true}
            showItemNavigators
            showItemNavigatorsOnHover
            item={itemTemplate}
            showThumbnails={false}
            showIndicators
        />}
    </>);
}

SelectBoxImages.propType = {
    object: PropTypes.object.isRequired,
    editActive: PropTypes.bool.isRequired,
    imageSelected: PropTypes.bool.isRequired,
    submitted: PropTypes.bool.isRequired,
}

export default SelectBoxImages;