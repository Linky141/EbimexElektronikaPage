import useTheme from '@mui/material/styles/useTheme';
import BearCarousel, { TBearSlideItemDataList, BearSlideImage, elClassName } from 'bear-react-carousel';
import 'bear-react-carousel/dist/index.css';
import AppShowTextMultiline from '../../app/components/AppShowTextMultiline';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useAppSelector } from '../../app/service/configureService';
import { isAdmin } from '../../app/utils/RolesUtils';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const theme = useTheme();
    const { t } = useTranslation();
    const { homePage } = useAppSelector(state => state.homePage);
    const { user } = useAppSelector(state => state.account);

    const CarouselButtonTheme = {
        background: 'transparent',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: theme.palette.info.main,
        color: theme.palette.info.main,
        borderRadius: 20,
    }

    const data: TBearSlideItemDataList = homePage!.pictureUrls.map(row => {
        return {
            key: row.id,
            children: <BearSlideImage imageUrl={row.url} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", }} />
        };
    });

    return (
        <>
            {isAdmin(user) &&
                <Button size="small" component={Link} to={`/homePageEdit`}>{t("edit")}</Button>
            }
            <AppShowTextMultiline content={homePage!.header} variant='h3' containerStyle={{paddingBottom: 20}}/>
            <BearCarousel
                data={data}
                height="200px"
                autoPlayTime={6000}
                isEnableAutoPlay
                isCenteredSlides
                isEnableLoop
                isEnableNavButton
                isEnablePagination
                isEnableMouseMove
                moveTime={3000}
                style={{
                    width: '100%',
                    height: '500px'
                }}
                renderNavButton={(toPrev, toNext) => {
                    return <div className={elClassName.navGroup}>
                        <button type="button" className={elClassName.navPrevButton} onClick={toPrev} style={CarouselButtonTheme}>
                            く
                        </button>
                        <button type="button" className={elClassName.navNextButton} onClick={toNext} style={CarouselButtonTheme}>
                            く
                        </button>
                    </div>
                }}
            />
            <AppShowTextMultiline content={homePage!.description} variant='h4' containerStyle={{paddingTop: 20}}/>
        </>
    )
}