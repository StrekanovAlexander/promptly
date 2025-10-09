export default function BardIcon({ size = 16, className = "", title }) {
    const titleId = title ? `icon-bard-${Math.random().toString(36).slice(2)}` : undefined;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            role={title ? "img" : undefined}
            aria-hidden={title ? undefined : true}
            aria-labelledby={title ? titleId : undefined}
        >
            {title ? <title id={titleId}>{title}</title> : null}
            <path d="M49.04,24.001l-1.082-0.043h-0.001C36.134,23.492,26.508,13.866,26.042,2.043L25.999,0.96C25.978,0.424,25.537,0,25,0
                s-0.978,0.424-0.999,0.96l-0.043,1.083C23.492,13.866,13.866,23.492,2.042,23.958L0.96,24.001C0.424,24.022,0,24.463,0,25
                c0,0.537,0.424,0.978,0.961,0.999l1.082,0.042c11.823,0.467,21.449,10.093,21.915,21.916l0.043,1.083
                C24.022,49.576,24.463,50,25,50s0.978-0.424,0.999-0.96l0.043-1.083c0.466-11.823,10.092-21.449,21.915-21.916l1.082-0.042
                C49.576,25.978,50,25.537,50,25C50,24.463,49.576,24.022,49.04,24.001z" />
        </svg>
    );
}
