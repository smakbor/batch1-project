//external lib import
import exportFromJSON from 'export-from-json';

const exportFromJson = (data, fileName, type) => {
    if (type === 'csv') {
        const exportType = exportFromJSON.types.csv;
        return exportFromJSON({ data, fileName, exportType });
    } else if (type === 'xls') {
        const exportType = exportFromJSON.types.xls;
        return exportFromJSON({ data, fileName, exportType });
    }
};

export default exportFromJson;
