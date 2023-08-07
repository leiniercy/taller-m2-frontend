

import DataViewMovile from "@components/pages/Client/Movil/DataViewMovile";
import MovileService from "@services/MovileServie";

export default function Cliente(props) {

    const movileService = new MovileService();

    return (
        <div className="sm:relative col p-4">
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <DataViewMovile  service={movileService.getAll()} />
                    </div>
                </div>
            </div>
        </div>
    );
}