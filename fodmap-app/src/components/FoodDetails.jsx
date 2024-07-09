

export const FoodDetails = ({ alimento }) => {

    const getIndiceClass = (indice) => {
        switch (indice.toLowerCase()) {
            case 'alto':
                return 'high';
            case 'medio':
                return 'medium';
            case 'bajo':
                return 'low';
            default:
                return '';
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    

    return (
        <div className={`product ${getIndiceClass(alimento.indice)}`}>
            <h3>{alimento.nombre}</h3>
            <p>Indice FODMAP: {capitalizeFirstLetter(alimento.indice)}</p>
        </div>
    );
};

// PROP TYPE 