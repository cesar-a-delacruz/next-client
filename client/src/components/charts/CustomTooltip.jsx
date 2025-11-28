export default function CustomTooltip({ active, payload }) {
    const isVisible = active && payload && payload.length;
    return (
        <div className="custom-tooltip" style={{ visibility: isVisible ? 'visible' : 'hidden', color: 'white' }}>
            {isVisible && (
                <p className="label">{`${payload[0].value}`}</p>
            )}
        </div>
    );
};