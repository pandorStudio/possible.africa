
import OneElementPage from './../../components/OneElementPage';

function OneActualite() {
  
    const iconSx = {
      ":hover": {
        cursor: "pointer",
      },
    };
  return <OneElementPage iconSx={iconSx} backUrl="/actualites" />;
}

export default OneActualite;
