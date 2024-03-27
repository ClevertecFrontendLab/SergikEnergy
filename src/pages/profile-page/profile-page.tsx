import { FC, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ProfileContent } from '@components/profile-content';
import { ProfileHeader } from '@components/profile-header';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { useGetUserInfoQuery } from '@redux/api/profile-api';
import {
    resetPersonalInfo,
    savePersonalInfoAfterRegistration,
} from '@redux/reducers/personal-info-slice';

import { Paths } from '../../routes/pathes';

export const ProfilePage: FC = () => {
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const { data: userPersonalInfo } = useGetUserInfoQuery();

    useEffect(() => {
        if (userPersonalInfo) {
            dispatch(savePersonalInfoAfterRegistration({ ...userPersonalInfo, url: '', name: '' }));
        }
    }, [dispatch, userPersonalInfo]);

    useEffect(() => {
        if (!token) {
            dispatch(resetPersonalInfo({ type: 'RESET' }));
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate, dispatch]);

    if (!token) {
        return <Navigate to={Paths.AUTH} replace={true} />;
    }

    return (
        <BasePagesLayout customHeader={true}>
            <ProfileHeader />
            <ProfileContent />
        </BasePagesLayout>
    );
};
