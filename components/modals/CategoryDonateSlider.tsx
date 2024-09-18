import { useState } from 'react';
import { StyleSheet, Dimensions, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { DismissSymbol } from '@/components/DismissSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CategoryDonateSlider({...props}) {
  const color = useThemeColor({ light: '#fff', dark: '#000'}, 'text');
  const viewHeight = (Dimensions.get('window').height);
  const [value, setValue] = useState();
  const [slideCompletionValue, setSlideCompletionValue] = useState(10);
  const [slideMealEquivalency, setSlideMealEquivalency] = useState(5);
  const [hearts, setHearts] = useState([]);
  const [heartCount, setHeartCount] = useState(1);

  let categoryImage;
  let categoryDescription;

  const { category } = props;

  switch (category) {
    case "School Meals":
      categoryDescription = ("Hunger is the opposite of learning in schools");
      categoryImage = ("../../assets/images/icon.png");
      break;
    case "Afterschool Meals":
      categoryDescription = ("Kids need food after school as well.");
      categoryImage = ("../../assets/images/icon.png");
      break;
    case "SNAP":
      categoryDescription = ("Advocate for meal benefits to help feed kids");
      categoryImage = ("../../assets/images/icon.png");
      break;
    case "Summer Meals":
      categoryDescription = ("Feed kids who are hungry during the summer.");
      categoryImage = ("../../assets/images/icon.png");
      break;
    default:
      categoryDescription = ("Feed kids who are hungry during the summer.");
      categoryImage = ("../../assets/images/icon.png");
  }

  function getRandomNumber(min, max) {
    return Math.random() * (max-min) + min;
  }

  const renderAboveThumbComponent = () => {
    return (
      <ThemedView style={styles.aboveThumbContainer}>
        {
          hearts.map((heart, index) => (
            <HeartContainer key={heart.id} index={index}  style={{right:heart.right}} onComplete={() => removeHeart(heart.id)} />
          ))
        }
      </ThemedView>
    );
  };

  const renderBelowThumbComponent = () => {
    return (
      <ThemedView style={styles.belowThumbContainer}>
        <ThemedText style={[styles.donationText, {color:'#f27622'}]}>${slideCompletionValue}</ThemedText>
      </ThemedView>
    );
  };

  const HeartContainer = ({...props}) => {
    const { index } = props;
    const size = 10 * getRandomNumber(2,5);
    const position = new Animated.Value(0); 
    const animationEndY = getRandomNumber(50,100);
    const negativeEndY = animationEndY * -1;

    const yAnimation = position.interpolate({
      inputRange: [negativeEndY, 0],
      outputRange: [animationEndY, 0]
    });

    const xAnimation = yAnimation.interpolate({
      inputRange: [0, animationEndY/6, animationEndY / 3, animationEndY /2, animationEndY],
      outputRange: [0, 25, 15, 0, 10]
    });
  
    const opacityAnimation = yAnimation.interpolate({
      inputRange: [0, animationEndY],
      outputRange: [1, 0]
    });
  
    const scaleAnimation = yAnimation.interpolate({
      inputRange: [0, 15, 30],
      outputRange: [0, 1.4, 1],
      extrapolate: "clamp"
    });

    const rotateAnimation = yAnimation.interpolate({
      inputRange: [0, animationEndY / 6, animationEndY / 3, animationEndY / 2, animationEndY ],
      outputRange: ['0deg', '-5deg', '0deg', '5deg', '0deg']
    });
  
    Animated.timing(position, {
      duration: 750*index,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(props.onComplete);
  
    const getHeartStyle = () => {
      return {
        transform: [
          {translateY: position}, 
          {scale:scaleAnimation}, 
          {translateX: xAnimation}, 
          {rotate: rotateAnimation}
        ],
        opacity: opacityAnimation
      }
    }

    return (
      <Animated.View style={[styles.heartContainer, getHeartStyle(), props.style]}>
        <Heart color="#f27622" size={size} />
      </Animated.View>
    )
  }

  const Heart = ({...props}) => {
    const { color, size } = props;
    return (
      <ThemedView {...props} style={[styles.heart]}>
        <MaterialCommunityIcons name="heart" size={size} color={color} />
      </ThemedView>
    )
  }

  const addHeart = () => {
    setHeartCount(prevHeartCount => prevHeartCount + 1);
    if(heartCount < 7) {
      setHearts(prevHearts => [
        ...prevHearts,
        {
          id: heartCount,
          right: getRandomNumber(30,50)
        },
      ]);
    }
  }

  const removeHeart = ({id}) => {
    //let updatedHeartArray = hearts.filter((heart) => heart.id !== id);
    //setHearts(prevHearts => [...updatedHeartArray]);
  }

  return (
    <ThemedView style={styles.container}>
      <DismissSymbol viewHeight={viewHeight} />
      <ThemedText style={styles.categoryText}>{category}: {categoryDescription}</ThemedText>
      <Image source={ require("../../assets/images/food-image.png") } style={styles.donateSlideImage} />
      <ThemedView style={styles.donateContainer}>
        <ThemedView style={{flexDirection:'row'}}>
          <ThemedText style={styles.mealsText}>Give </ThemedText>
          <ThemedText style={[styles.mealsTextNumber, {}]}>{slideMealEquivalency}</ThemedText>
          <ThemedText style={styles.mealsText}> meals to hungry kids</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.sliderContainer, {width:Dimensions.get('window').width-80}]}>
          <Slider
            containerStyle={{width:'100%'}}
            minimumValue={10}
            maximumValue={50}
            step={1}
            value={10}
            minimumTrackTintColor="#f27622"
            maximumTrackTintColor="rgba(242,118,34, 0.4)"
            thumbImage={require('../../assets/images/heart-slider.png')}
            thumbStyle={{backgroundColor:'transparent', width:44, height: 44}}
            thumbTouchSize={{width: 40, height: 40}}
            trackStyle={{width:'100%',height:12, borderRadius:5}}
            renderAboveThumbComponent={renderAboveThumbComponent}
            renderBelowThumbComponent={renderBelowThumbComponent}
            onValueChange={value => {
              setValue(value);
              addHeart();
            }}
            onSlidingComplete={value => {
              setSlideCompletionValue(value);
              setSlideMealEquivalency(value*0.5);
            }}
          />
        </ThemedView>
        <TouchableOpacity style={[styles.donateButton, {width:Dimensions.get('window').width-80}]}>
          <ThemedText style={styles.continueText}>Continue to donate ${slideCompletionValue}</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingTop:140,
    paddingBottom:100,
  },
  categoryText: {
    fontSize:24,
    fontWeight:'bold',
    lineHeight:30,
    paddingBottom:15,
    paddingLeft:15,
    paddingRight:15,
    textAlign:'center',
    backgroundColor:'transparent'
  },
  donateSlideImage: {
    marginTop:25,
    marginBottom:25,
    width:280,
    height:180,
    backgroundColor:'transparent'
  },
  mealsText: {
    fontSize:24,
    lineHeight:30,
    fontWeight:'bold',
    paddingTop:25,
    paddingBottom:25,
    backgroundColor:'transparent'
  },
  mealsTextNumber: {
    fontSize:40,
    lineHeight:30,
    fontWeight:'bold',
    paddingTop:25,
    paddingBottom:25,
    backgroundColor:'transparent',
    color:'#f27622', 
    textDecorationLine:'underline'    
  },
  donateContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'transparent'
  },
  sliderContainer: {
    elevation:5,
    backgroundColor:"#fff",
    borderRadius:40,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2
    },
    marginTop:50,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:20,
    paddingRight:20,
  },
  donateButton: {
    marginTop:120,
    padding:15,
    borderRadius:15,
    backgroundColor:'rgba(253,185,23, 1)',
    justifyContent:'center',
    alignItems:'center'
  },
  aboveThumbContainer: {
    flex:1,
    width:100,
    height:200,
    alignItems:'center',
    justifyContent:'center',
    left: -50,
    backgroundColor:'transparent'
  },
  belowThumbContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:80,
    left: -30,
    backgroundColor:'transparent'
  },
  donationText: {
    fontSize:28,
    lineHeight:36,
    fontWeight:'bold',
    backgroundColor:'transparent',
    justifyContent:'center',
    alignItems:'center'
  },
  heartContainer: {
    position:'absolute',
    bottom:0,
    backgroundColor:'transparent'
  },
  heart: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'transparent'
  },
  continueText: {
    fontSize:16,
    lineHeight:22,
    fontWeight:'bold',
  },
});
