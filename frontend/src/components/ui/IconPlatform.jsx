export default function IconPlatform({ platform }) {
    return (
        <img 
            src={`/icons/${platform.icon}.svg`} 
            alt={platform.name} 
            className="h-5 w-5 filter grayscale opacity-75" 
        />
    );
}