import useTheme from '@mui/material/styles/useTheme';
import BearCarousel, { TBearSlideItemDataList, BearSlideImage, elClassName } from 'bear-react-carousel';
import 'bear-react-carousel/dist/index.css';
import AppShowTextMultiline from '../../app/components/AppShowTextMultiline';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

export default function HomePage() {
    const theme = useTheme();
    const {t} = useTranslation();

    const CarouselButtonTheme = {
        background: 'transparent',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: theme.palette.info.main,
        color: theme.palette.info.main,
        borderRadius: 20,
    }

    const images = [
        { id: 1, imageUrl: "https://picsum.photos/400" },
        { id: 2, imageUrl: "https://picsum.photos/1000" },
        { id: 3, imageUrl: "https://picsum.photos/500" },
        { id: 4, imageUrl: "https://picsum.photos/600" },
        { id: 5, imageUrl: "https://picsum.photos/200" },
    ];

    const data: TBearSlideItemDataList = images.map(row => {
        return {
            key: row.id,
            children: <BearSlideImage imageUrl={row.imageUrl} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", }} />
        };
    });

    return (

        <>
            <Button>{t('edit')}</Button>
            <AppShowTextMultiline content='Test test test test test test test test test test test' variant='h3'/>
            <BearCarousel
                data={data}
                height="200px"
                autoPlayTime={8000}
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
            <AppShowTextMultiline content='Test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test' variant='h4'/>
        </>

    )
}