import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Text, Card, Title} from 'react-native-paper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Colors} from '../../styles/colors';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';

const calcAvg = array => {
  if (array.length === 0) {
    return 0;
  } else {
    let total = 0;
    array.map(data => {
      total += data;
    });

    return total / array.length;
  }
};

const WeightTab = ({progressInfo}) => {
  const [weightData, setWeightData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    extractWeightData();
  }, []);

  const extractWeightData = () => {
    const extractedWeights = progressInfo.map(data => {
      return calcAvg(data.weight);
    });

    const extractedDates = progressInfo.map(data =>
      moment(data.createdAt).format('DD/MM'),
    );

    extractedWeights.reverse();
    extractedDates.reverse();

    setWeightData(extractedWeights);
    setLabels(extractedDates);
  };

  return (
    <View>
      {labels.length ? (
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: weightData,
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={250}
          chartConfig={{
            backgroundGradientFrom: Colors.darkGrey,
            backgroundGradientTo: Colors.darkGrey,
            decimalPlaces: 1,
            color: () => Colors.bluePrimary,
            labelColor: () => Colors.grey,
            style: {
              borderRadius: 20,
            },
            propsForDots: {
              r: 5,
              strokeWidth: 3,
              stroke: Colors.blueSecondary,
            },
            propsForLabels: {
              fontFamily: 'NunitoSans-Bold',
            },
          }}
          bezier
          style={{
            paddingVertical: 10,
          }}
        />
      ) : null}
    </View>
  );
};

const RepTab = ({progressInfo}) => {
  const [repsData, setRepsData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    extractRepsData();
  }, []);

  const extractRepsData = () => {
    const extractedReps = progressInfo.map(data => {
      return calcAvg(data.reps);
    });

    const extractedDates = progressInfo.map(data =>
      moment(data.createdAt).format('DD/MM'),
    );

    extractedReps.reverse();
    extractedDates.reverse();

    setRepsData(extractedReps);
    setLabels(extractedDates);
  };

  return (
    <View>
      {labels.length ? (
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: repsData,
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={250}
          chartConfig={{
            backgroundGradientFrom: Colors.darkGrey,
            backgroundGradientTo: Colors.darkGrey,
            decimalPlaces: 1,
            color: () => Colors.bluePrimary,
            labelColor: () => Colors.grey,
            style: {
              borderRadius: 20,
            },
            propsForDots: {
              r: 5,
              strokeWidth: 3,
              stroke: Colors.blueSecondary,
            },
            propsForLabels: {
              fontFamily: 'NunitoSans-Bold',
            },
          }}
          bezier
          style={{
            paddingVertical: 10,
          }}
        />
      ) : null}
    </View>
  );
};

const SetsTab = ({progressInfo}) => {
  const [setsData, setSetsData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    extractSetsData();
  }, []);

  const extractSetsData = () => {
    const extractedSets = progressInfo.map(data => data.sets);

    const extractedDates = progressInfo.map(data =>
      moment(data.createdAt).format('DD/MM'),
    );

    extractedSets.reverse();
    extractedDates.reverse();

    setSetsData(extractedSets);
    setLabels(extractedDates);
  };

  return (
    <View>
      {labels.length ? (
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: setsData,
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={250}
          chartConfig={{
            backgroundGradientFrom: Colors.darkGrey,
            backgroundGradientTo: Colors.darkGrey,
            decimalPlaces: 1,
            color: () => Colors.bluePrimary,
            labelColor: () => Colors.grey,
            style: {
              borderRadius: 20,
            },
            propsForDots: {
              r: 5,
              strokeWidth: 3,
              stroke: Colors.blueSecondary,
            },
            propsForLabels: {
              fontFamily: 'NunitoSans-Bold',
            },
          }}
          bezier
          style={{
            paddingVertical: 10,
          }}
        />
      ) : null}
    </View>
  );
};

const WorkloadTab = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: Colors.fgPrimary,
    }}
    style={{
      backgroundColor: Colors.darkGrey,
      marginTop: 10,
    }}
  />
);

const initialLayout = {width: Dimensions.get('window').width};

const ExerciseProgressCard = ({exercise, progressInfo}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Weight'},
    {key: 'second', title: 'Reps'},
    {key: 'third', title: 'Sets'},
    {key: 'fourth', title: 'Total'},
  ]);

  const renderScene = SceneMap({
    first: () => <WeightTab progressInfo={progressInfo} />,
    second: () => <RepTab progressInfo={progressInfo} />,
    third: () => <SetsTab progressInfo={progressInfo} />,
    fourth: () => <WorkloadTab progressInfo={progressInfo} />,
  });

  return (
    <Card style={styles.cardStyle}>
      <Title style={{alignSelf: 'center', marginVertical: 10}}>
        {exercise.name}
      </Title>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        style={{backgroundColor: Colors.darkGrey}}
      />
    </Card>
  );
};

export default ExerciseProgressCard;

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 20,
    marginVertical: 5,
  },
  scene: {
    flex: 1,
  },
});
