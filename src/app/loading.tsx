export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl">
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div
                    className="w-20 h-20 border-4 border-transparent text-secondarypurple text-4xl animate-spin flex items-center justify-center border-t-secondarypurple rounded-full"
                >
                    <div
                        className="w-16 h-16 border-4 border-transparent text-secondarygreen text-2xl animate-spin flex items-center justify-center border-t-secondarygreen rounded-full"
                    ></div>
                </div>
            </div>
        </div>
    )
}