

export const HigthLowIndicator = ({ changePercentage }: { changePercentage: number }) => {

    const formattedPercentage = changePercentage.toFixed(2);
    const textColor =  changePercentage > 0 ? 
    ' text-sm py-0.5 px-2.5 rounded bg-green-600 text-green-600 bg-opacity-25 ' : 
    
    ' text-sm py-0.5 px-2.5 rounded bg-red-600 text-red-600 bg-opacity-25 ';

    return (
        <>
        <div className="mt-1">
            <span className={`${textColor} font-bold`}>{formattedPercentage}%</span>
        </div>
        </>
    )
}
