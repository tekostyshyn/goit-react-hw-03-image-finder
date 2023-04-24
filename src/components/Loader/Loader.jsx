import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='Loader'>
      <ThreeDots
        height="60"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
