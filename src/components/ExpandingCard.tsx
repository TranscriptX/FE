
export default function ExpandingCard() {
    return (
        <div className="group w-full max-w-[20px] min-h-[480px] bg-color_secondary shadow-md hover:shadow-lg hover:min-w-[400px] transition-all duration-[700] ease-in-out cursor-pointer overflow-hidden">
    
    
            <div className="flex flex-row justify-center items-center max-h-0 overflow-hidden opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 max-w-[50px] transition-all duration-[500] ease-in-out mt-0 group-hover:mt-4">
                <p className="text-black">
                This is the content that appears on hover.
                </p>
            </div>
        </div>
    );
}