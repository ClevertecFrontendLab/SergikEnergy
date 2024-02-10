import { FC } from 'react';

import classes from './logo.module.css';
import LogoIcon from '/images/LogoFit.svg';
import LogoText from '/images/LogoText.svg';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const Logo: FC = () => {
    const collapsed = useAppSelector((state) => state.collapse.collapsed);
    return (
        <div className={!collapsed ? `${classes.logo}` : `${classes.logo} ${classes.collapsed}`}>
            <div className={!collapsed ? classes['logo__text'] : classes.hidden}>
                <img src={LogoText} alt='Clever' />
            </div>
            <div className={classes['logo__icon']}>
                <img src={LogoIcon} alt='fit Logo' />
            </div>
        </div>
    );
};
