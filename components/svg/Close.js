export default function Close(props) {
  return (
    <div
      onClick={props.click && props.click}
      className={`absolute z-7 top-1 right-1 ${
        props.className && props.className
      }`}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className={`h-5 w-9 z-2 ${props.closeClass && props.closeClass}`}
      >
        <path
          fillRule='evenodd'
          d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
          clipRule='evenodd'
        />
      </svg>
    </div>
  );
}
