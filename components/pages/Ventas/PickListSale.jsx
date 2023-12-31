
import PropTypes from 'prop-types';
import {MultiSelect} from 'primereact/multiselect';

const PickListSale = (props) =>{

    const panelFooterTemplate = () => {
        const length = props.selectedProducts ? props.selectedProducts.length : 0;

        return (
            <div className="py-2 px-3">
                <b>{length}</b> producto{length > 1 ? 's' : ''} seleccionado{length > 1 ? 's' : ''}.
            </div>
        );
    };

    return (
        <MultiSelect
            value={props.selectedProducts}
            onChange={(e) => props.onChangeSelectedBoxProducts(e)}
            options={props.products}
            optionLabel="name"
            filter
            display="chip"
            placeholder="Seleccione los productos"
            panelFooterTemplate={panelFooterTemplate}
            className="w-full"/>
    );
}

PickListSale.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChangeSelectedBoxProducts: PropTypes.func.isRequired,
}

export default PickListSale;