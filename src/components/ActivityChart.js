import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../redux/action';
import { getReq } from '../utils.js/basicReq';

const ActivityChart = ({ isOpen,  index, owner }) => {
    const [data, setData] = useState([]);
    const [contributorsData, setContributorsData] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isOpen.index === index) {
            if (isOpen.flag === 'Commit') {
                getActivityData(`https://api.github.com/repos/${owner}/stats/commit_activity`);
            }
            else {
                getActivityData(`https://api.github.com/repos/${owner}/stats/code_frequency`);
            }

            getContributorsData(`https://api.github.com/repos/${owner}/stats/contributors`);
        }
    }, [isOpen])

    const getActivityData = async (url) => {
        dispatch(setIsLoading(true));
        await getReq(url)
            .then((res) => {
                if (res.status === true) {
                    formatedData(res?.data);
                    dispatch(setIsLoading(false));
                } else {
                    dispatch(setIsLoading(false));
                }
            });
    }

    const getContributorsData = async (url) => {
        dispatch(setIsLoading(true));
        await getReq(url)
            .then((res) => {
                if (res.status === true) {
                    formatContributorsData(res?.data);
                    dispatch(setIsLoading(false));
                } else {
                    dispatch(setIsLoading(false));
                }
            });
    }

    const formatedData = (data) => {
        let series = [];
        data?.length>0 && data.map((item) => {
            series.push(item.total)
        })
        setData([...series]);
    }

    const formatContributorsData = (data) => {
        let arr = [];
        data?.length>0 && data.map((item) => {
            arr.push({ data: [item.total] });
        });
        setContributorsData([...arr])
    };

    const activityOptions = {
        title: {
            text: `Total ${isOpen.flag} Chart`
        },
        series: [
            { data: [...data] },
        ],
    }

    const contributorsOptions = {
        title: {
            text: `Contributors Chart`
        },
        series: [...contributorsData],
    }



  return (
    <>
    <HighchartsReact
        highcharts={Highcharts}
        options={activityOptions}
        width='100%'
    />
    <HighchartsReact
        highcharts={Highcharts}
        options={contributorsOptions}
        width='100%'
    />
</>
  )
}

export default ActivityChart