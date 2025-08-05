
interface ConquestModalProps {
    title: string;
    description: string;
    isComplete: boolean;
}

export function ConquestModal({ description, isComplete, title }:ConquestModalProps) {
    return (
        <div 
            className="flex flex-col gap-1 text-primarybege p-4 rounded-sm"
            style={isComplete ? { backgroundColor: '#613DC1' } : { backgroundColor: '#1D2D44' }}
        >
            <p className="text-2xl font-bold">{title}</p>
            <p className="text-primarylightblue">{description}</p>

            <div className="flex flex-wrap gap-2 items-center justify-between mt-6">
                <span 
                    className="px-4 py-1 rounded-full font-medium" 
                    style={isComplete ? { backgroundColor: '#32E875' } : { backgroundColor: '#748CAB' }}
                >
                    {isComplete ? 'Completo' : 'Em progresso'}
                </span>

                {isComplete ? (
                    <div className="flex items-center justify-center gap-2 w-fit px-2.5 py-1 rounded-full border-1 border-secondarygreen shadow-[0_0_8px_2px_rgba(126,197,67,0.5)]">
                        <div className='w-3 h-3 rounded-full bg-secondarygreen animate-pulse' />
                        <span className="text-secondarygreen text-shadow-lg font-medium">{title}</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2 w-fit px-2.5 py-1 rounded-full border-1 border-secondarypurple">
                        <div className='w-3 h-3 rounded-full bg-secondarypurple animate-pulse' />
                        <span className="text-secondarypurple text-shadow-lg font-medium">{title}</span>
                    </div>
                )}
                
            </div>
        </div>
    )
}