import './Jack.scss';

function Jack(props: { output?: boolean; label?: string }) {
  const labelIfPresent = () => {
    if (!props.label) {
      return;
    }
    return <span className='jack-label'>{props.label.toUpperCase()}</span>;
  };
  return (
    <div className={`jack-root${props.output ? ' output' : ''}`}>
      <div className='jack-background'>
        {labelIfPresent()}
        <div className='jack-edge'>
          <div className='jack-middle'></div>
        </div>
      </div>
    </div>
  );
}

export default Jack;
