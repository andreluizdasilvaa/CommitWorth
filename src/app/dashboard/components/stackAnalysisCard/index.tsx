import { Medal, Code, TrendingUp, Clock } from 'lucide-react'
import { StackAnalysis } from '@/lib/stackAnalysis'

interface StackAnalysisCardProps {
    stackAnalysis: StackAnalysis
    className?: string
}

export function StackAnalysisCard({ stackAnalysis, className }: StackAnalysisCardProps) {
    const getSeniorityColor = (level: string) => {
        switch (level) {
            case 'Tech Lead': return 'text-secondaryyellow'
            case 'Senior': return 'text-secondarygreen'
            case 'Pleno': return 'text-primarylightblue'
            case 'Junior': return 'text-secondarygray'
            default: return 'text-secondarygray'
        }
    }

    const getSeniorityIcon = () => {
        switch (stackAnalysis.seniorityLevel) {
            case 'Tech Lead': return <Medal className="text-secondaryyellow" size={24} />
            case 'Senior': return <TrendingUp className="text-secondarygreen" size={24} />
            case 'Pleno': return <Code className="text-primarylightblue" size={24} />
            case 'Junior': return <Clock className="text-secondarygray" size={24} />
            default: return <Clock className="text-secondarygray" size={24} />
        }
    }

    return (
        <div className={`flex flex-col gap-5 w-full min-h-64 rounded-2xl shadow-2xl bg-primaryblue p-5 pb-10 ${className || ""}`}>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <p className='text-xl text-primarybege font-inter font-bold'>Análise de Stack & Senioridade</p>
                </div>
                
                <div className='flex items-center gap-2'>
                    {getSeniorityIcon()}
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                {/* Stack Principal */}
                <div className='bg-secondaryblue p-4 rounded-lg'>
                    <h3 className='text-primarybege font-semibold mb-2 flex items-center gap-2'>
                        <Code size={18} />
                        Stack Principal
                    </h3>
                    <p className='text-secondarygreen text-2xl font-bold'>{stackAnalysis.primaryStack}</p>
                    <p className='text-primarybege text-sm opacity-80'>
                        {stackAnalysis.stackSummary.primaryLanguagePercentage}% dos seus repositórios
                    </p>
                </div>

                {/* Nível de Senioridade */}
                <div className='bg-secondaryblue p-4 rounded-lg'>
                    <h3 className='text-primarybege font-semibold mb-2 flex items-center gap-2'>
                        <TrendingUp size={18} />
                        Nível de Senioridade
                    </h3>
                    <p className={`text-2xl font-bold ${getSeniorityColor(stackAnalysis.seniorityLevel)}`}>
                        {stackAnalysis.seniorityLevel}
                    </p>
                    <p className='text-primarybege text-sm opacity-80'>
                        Score: {stackAnalysis.seniorityScore}/100
                    </p>
                </div>

                {/* Resumo da Experiência */}
                <div className='bg-secondaryblue p-4 rounded-lg'>
                    <h3 className='text-primarybege font-semibold mb-2 flex items-center gap-2'>
                        <Clock size={18} />
                        Experiência
                    </h3>
                    <div className='grid grid-cols-1 gap-2 text-sm'>
                        <p className='text-primarybege'>
                            <span className='opacity-80'>Linguagens dominadas:</span> 
                            <span className='text-secondarygreen ml-1 font-semibold'>
                                {stackAnalysis.stackSummary.totalLanguages}
                            </span>
                        </p>
                        <p className='text-primarybege'>
                            <span className='opacity-80'>Tempo de experiência:</span>
                            <span className='text-secondarygreen ml-1 font-semibold'>
                                {stackAnalysis.stackSummary.experienceRange}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Top 3 Linguagens */}
                {stackAnalysis.stackExperience.length > 0 && (
                    <div className='bg-secondaryblue p-4 rounded-lg'>
                        <h3 className='text-primarybege font-semibold mb-3'>Top Linguagens</h3>
                        <div className='space-y-2'>
                            {stackAnalysis.stackExperience.slice(0, 3).map((exp, index) => (
                                <div key={exp.language} className='flex justify-between items-center'>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-secondarygreen font-mono text-xs px-2 py-1 bg-primaryblue rounded'>
                                            #{index + 1}
                                        </span>
                                        <span className='text-primarybege text-sm'>{exp.language}</span>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-secondarygreen text-xs font-semibold'>
                                            {exp.repositories} repos
                                        </p>
                                        <p className='text-primarybege text-xs opacity-70'>
                                            {exp.yearsOfExperience} {exp.yearsOfExperience === 1 ? 'ano' : 'anos'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
