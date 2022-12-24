import React from "react";
import MaterialTable from "material-table";

const MTable = ({ cols, data, title, actions = [], editable = {}, detailPanel = null, onRowClick = "" }) => {


    return (
        <div className="container">
            <MaterialTable
                title={title}
                columns={cols}
                data={data}
                options={{
                    filtering: true,
                    exportButton: true,
                    grouping: true,
                    headerStyle: {
                        backgroundColor: '#256333',
                        color: '#FFF'
                    },
                    actionsColumnIndex: -1,
                    sorting: true
                }}
                editable={editable}
                actions={actions}
                detailPanel={detailPanel}
                onRowClick={onRowClick}
            />
        </div>
    )
}

export default MTable;