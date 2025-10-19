import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Animated, TextInput, LayoutAnimation, UIManager, Platform, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { height } = Dimensions.get('window');

// Define the different donation levels
const oneTimeAmounts = [50, 100, 250, 500];
const monthlyAmounts = [15, 20, 30, 50];

// A reusable component for the preset amount buttons
const AmountButton = ({ amount, selected, onPress }) => (
  <TouchableOpacity 
    style={[styles.amountButton, selected && styles.amountButtonSelected]} 
    onPress={() => onPress(amount)}
  >
    <Text style={[styles.amountButtonText, selected && styles.amountButtonTextSelected]}>
      ${amount}
    </Text>
  </TouchableOpacity>
);

// Step 1 Component
const DonateTodayStep = ({ frequency, amount, otherAmount, isDedicated, dedicationType, dedicationName, setFrequency, setAmount, setOtherAmount, toggleDedication, setDedicationType, setDedicationName, handleFrequencyChange }) => {
  const currentAmountLevels = frequency === 'one-time' ? oneTimeAmounts : monthlyAmounts;

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Donate Today</Text>
      </View>
      <View style={styles.freqContainer}>
        <TouchableOpacity 
          style={[styles.freqButton, frequency === 'one-time' && styles.freqButtonSelected]}
          onPress={() => handleFrequencyChange('one-time')}
        >
          <Text style={[styles.freqButtonText, frequency === 'one-time' && styles.freqButtonTextSelected]}>ONE TIME</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.freqButton, frequency === 'monthly' && styles.freqButtonSelected]}
          onPress={() => handleFrequencyChange('monthly')}
        >
          <Text style={[styles.freqButtonText, frequency === 'monthly' && styles.freqButtonTextSelected]}>MONTHLY</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.amountGrid}>
        {currentAmountLevels.map((level) => (
          <AmountButton 
            key={level}
            amount={level} 
            selected={amount === level && !otherAmount} 
            onPress={setAmount} 
          />
        ))}
        <View style={[styles.amountButton, otherAmount ? styles.amountButtonSelected : {}]}>
          <TextInput
            style={[styles.otherAmountInput, otherAmount ? styles.amountButtonTextSelected : {}]}
            placeholder="OTHER: $"
            placeholderTextColor="#555"
            keyboardType="numeric"
            value={otherAmount}
            onChangeText={(text) => {
              setOtherAmount(text);
              if (text) setAmount(0);
            }}
          />
        </View>
      </View>
      <View style={styles.dedicationContainer}>
        <TouchableOpacity style={styles.dedicationRow} onPress={toggleDedication}>
          <MaterialCommunityIcons 
            name={isDedicated ? 'checkbox-marked' : 'checkbox-blank-outline'} 
            size={26} 
            color={isDedicated ? '#f27622' : '#888'}
          />
          <Text style={styles.dedicationTitle}>Dedicate my donation</Text>
        </TouchableOpacity>
        <Text style={styles.dedicationDescription}>
          Honor someone special or memorialize someone who has passed with your gift. You can send a special notification card electronically or by mail.
        </Text>
        {isDedicated && (
          <View style={styles.dedicationInputContainer}>
            <View style={styles.freqContainer}>
              <TouchableOpacity 
                style={[styles.freqButton, dedicationType === 'honor' && styles.freqButtonSelected]}
                onPress={() => setDedicationType('honor')}
              >
                <Text style={[styles.freqButtonText, dedicationType === 'honor' && styles.freqButtonTextSelected]}>IN HONOR OF</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.freqButton, dedicationType === 'memory' && styles.freqButtonSelected]}
                onPress={() => setDedicationType('memory')}
              >
                <Text style={[styles.freqButtonText, dedicationType === 'memory' && styles.freqButtonTextSelected]}>IN MEMORY OF</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.dedicationNameInput}
              placeholder="Name"
              placeholderTextColor="#999"
              value={dedicationName}
              onChangeText={setDedicationName}
            />
          </View>
        )}
      </View>
    </>
  );
};

// Step 2 Component for Honor Gift
const HonorGiftStep = ({ setStep, notificationPreference, setNotificationPreference }) => (
  <>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => setStep(1)} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
      <Text style={[styles.headerTitle, {flex: 1, textAlign: 'center', marginRight: 24}]}>Honor Gift</Text>
    </View>
    <Text style={styles.honorGiftQuestion}>Would you like to notify someone of this gift?</Text>
    <View style={styles.honorGiftButtonContainer}>
        <TouchableOpacity 
          style={[styles.freqButton, styles.honorGiftButton, notificationPreference === 'email' && styles.freqButtonSelected]}
          onPress={() => setNotificationPreference('email')}
        >
            <Text style={[styles.freqButtonText, notificationPreference === 'email' && styles.freqButtonTextSelected]}>BY EMAIL</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.freqButton, styles.honorGiftButton, notificationPreference === 'none' && styles.freqButtonSelected]}
          onPress={() => setNotificationPreference('none')}
        >
            <Text style={[styles.freqButtonText, notificationPreference === 'none' && styles.freqButtonTextSelected]}>NO, THANK YOU</Text>
        </TouchableOpacity>
    </View>
  </>
);

// Step 3 Component for Upsell
const UpsellStep = ({ setStep, isDedicated, amount, otherAmount, handleUpsellAccept, handleUpsellDecline }) => {
    const finalAmount = otherAmount || amount;
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setStep(isDedicated ? 2 : 1)} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, {flex: 1, textAlign: 'center', marginRight: 24}]}>Make this a Monthly Gift</Text>
            </View>
            <View style={styles.upsellContent}>
                <MaterialCommunityIcons name="calendar-month" size={80} color="#888" />
                <Text style={styles.upsellText}>
                    Will you consider becoming one of our valued monthly supporters by converting your ${finalAmount} contribution into a monthly donation?
                </Text>
                <Text style={styles.upsellSubtext}>
                    Ongoing monthly donations allow us to better focus on our mission.
                </Text>
                <TouchableOpacity style={[styles.upsellButton, styles.upsellButtonDark]} onPress={handleUpsellAccept}>
                    <Text style={styles.upsellButtonText}>GIVE ${finalAmount}/MONTHLY</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.upsellButton, styles.upsellButtonOrange]} onPress={handleUpsellDecline}>
                    <Text style={styles.upsellButtonText}>KEEP MY ONE TIME ${finalAmount} GIFT</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

// Step 4 Component for Payment Options
const PaymentOptionsStep = ({ setStep, frequency, amount, otherAmount, coverFee, setCoverFee, previousStep }) => {
    const finalAmount = otherAmount || amount;
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setStep(previousStep)} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, {flex: 1, textAlign: 'center', marginRight: 24}]}>Payment Options</Text>
            </View>
            <View style={styles.paymentContent}>
                <View style={styles.paymentAmountContainer}>
                    <Text style={styles.paymentAmount}>${finalAmount}</Text>
                    <Text style={styles.paymentCurrency}>USD</Text>
                </View>
                {frequency === 'monthly' && <Text style={styles.paymentFrequency}>Monthly</Text>}
                
                <TouchableOpacity style={styles.transactionCostsContainer} onPress={() => setCoverFee(!coverFee)}>
                    <MaterialCommunityIcons name={coverFee ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color={coverFee ? '#f27622' : '#888'} />
                    <Text style={styles.transactionCostsText}>Cover transaction costs</Text>
                </TouchableOpacity>

                <View style={styles.feeDetailsContainer}>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeText}>Transaction fee <MaterialCommunityIcons name="help-circle-outline" size={14} color="#888" /></Text>
                        <Text style={styles.feeAmount}>$1.05</Text>
                    </View>
                     <View style={styles.feeRow}>
                        <Text style={styles.feeText}>Donation total</Text>
                        <Text style={styles.feeAmount}>${finalAmount}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.paymentMethodButton} onPress={() => setStep(5)}>
                    <Text style={styles.paymentMethodText}>GIVE BY CREDIT OR DEBIT</Text>
                    <MaterialCommunityIcons name="credit-card" size={20} color="#fff" />
                </TouchableOpacity>
                 <TouchableOpacity style={styles.paymentMethodButton}>
                    <Text style={styles.paymentMethodText}>GIVE BY PAYPAL</Text>
                    <MaterialCommunityIcons name="paypal" size={20} color="#fff" />
                </TouchableOpacity>
                 <TouchableOpacity style={styles.paymentMethodButton} onPress={() => setStep(6)}>
                    <Text style={styles.paymentMethodText}>GIVE BY BANK TRANSFER</Text>
                    <MaterialCommunityIcons name="bank" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </>
    );
};

// Step 5: Credit Card Form
const CreditCardStep = ({ setStep }) => (
    <>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => setStep(4)} style={styles.backButton}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, {flex: 1, textAlign: 'center', marginRight: 24}]}>Credit Card</Text>
        </View>
        <View style={styles.paymentForm}>
            <View style={styles.cardIconsContainer}>
                <Image source={{uri: 'https://placehold.co/100x60/f0f0f0/333?text=VISA'}} style={styles.cardIcon} />
                <Image source={{uri: 'https://placehold.co/100x60/f0f0f0/333?text=MC'}} style={styles.cardIcon} />
                <Image source={{uri: 'https://placehold.co/100x60/f0f0f0/333?text=AMEX'}} style={styles.cardIcon} />
                <Image source={{uri: 'https://placehold.co/100x60/f0f0f0/333?text=DISC'}} style={styles.cardIcon} />
            </View>
            <TextInput style={styles.paymentInput} placeholder="CREDIT CARD NUMBER" keyboardType="numeric" />
            <View style={styles.paymentInputRow}>
                <TextInput style={[styles.paymentInput, {flex: 1}]} placeholder="MM" keyboardType="numeric" />
                <TextInput style={[styles.paymentInput, {flex: 1}]} placeholder="YYYY" keyboardType="numeric" />
                <TextInput style={[styles.paymentInput, {flex: 1}]} placeholder="CVV" keyboardType="numeric" />
            </View>
            <View style={styles.securityContainer}>
                 <Image source={{uri: 'https://placehold.co/150x60/f0f0f0/333?text=GeoTrust'}} style={styles.securityIcon} />
                 <Text style={styles.securityText}>We take data and privacy seriously. Your credit card information is secure and will be used only to process your gift.</Text>
            </View>
        </View>
    </>
);

// Step 6: Bank Transfer Form
const BankTransferStep = ({ setStep, accountType, setAccountType, agreeToTerms, setAgreeToTerms }) => (
     <>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => setStep(4)} style={styles.backButton}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, {flex: 1, textAlign: 'center', marginRight: 24}]}>Bank Transfer</Text>
        </View>
        <View style={styles.paymentForm}>
            <TextInput style={styles.paymentInput} placeholder="BANK ROUTING NUMBER" keyboardType="numeric" />
            <Text style={styles.linkText}>What is this?</Text>
            <TextInput style={styles.paymentInput} placeholder="BANK ACCOUNT NUMBER" keyboardType="numeric" />
            <TextInput style={styles.paymentInput} placeholder="VERIFY BANK ACCOUNT NUMBER" keyboardType="numeric" />
            
            <View style={styles.freqContainer}>
                <TouchableOpacity 
                    style={[styles.freqButton, accountType === 'checking' && styles.freqButtonSelected]}
                    onPress={() => setAccountType('checking')}
                >
                    <Text style={[styles.freqButtonText, accountType === 'checking' && styles.freqButtonTextSelected]}>CHECKING</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.freqButton, accountType === 'savings' && styles.freqButtonSelected]}
                    onPress={() => setAccountType('savings')}
                >
                    <Text style={[styles.freqButtonText, accountType === 'savings' && styles.freqButtonTextSelected]}>SAVINGS</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.termsContainer} onPress={() => setAgreeToTerms(!agreeToTerms)}>
                <MaterialCommunityIcons name={agreeToTerms ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color={agreeToTerms ? '#f27622' : '#888'} />
                <Text style={styles.termsText}>By checking this option, I agree to use my bank account as a payment method and authorize this organization to debit my bank account to fulfill my donation commitment.</Text>
            </TouchableOpacity>
        </View>
    </>
);

// Step 7: Payment Information Form
const PaymentInfoStep = ({ setStep, paymentMethodStep, communicationOptIn, setCommunicationOptIn }) => (
    <>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => setStep(paymentMethodStep)} style={styles.backButton}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, {flex: 1, textAlign: 'center', marginRight: 24}]}>Payment Information</Text>
        </View>
        <View style={styles.paymentForm}>
            <View style={styles.paymentInputRow}>
                <TextInput style={[styles.paymentInput, {flex: 1}]} placeholder="FIRST NAME*" />
                <TextInput style={[styles.paymentInput, {flex: 1}]} placeholder="LAST NAME*" />
            </View>
            <TextInput style={styles.paymentInput} placeholder="BILLING STREET" />
            <View style={styles.paymentInputRow}>
                <TextInput style={[styles.paymentInput, {flex: 1}]} placeholder="CITY*" />
                <TextInput style={[styles.paymentInput, {flex: 1}]} placeholder="STATE*" />
            </View>
             <View style={styles.paymentInputRow}>
                <TextInput style={[styles.paymentInput, {flex: 1}]} placeholder="ZIP*" keyboardType="numeric" />
                <TextInput style={[styles.paymentInput, {flex: 1}]} placeholder="UNITED STATES" />
            </View>
             <View style={styles.paymentInputRow}>
                <TextInput style={[styles.paymentInput, {flex: 1}]} placeholder="EMAIL*" keyboardType="email-address" />
                <TextInput style={[styles.paymentInput, {flex: 1}]} placeholder="PHONE" keyboardType="phone-pad" />
            </View>
            <TouchableOpacity style={styles.termsContainer} onPress={() => setCommunicationOptIn(!communicationOptIn)}>
                <MaterialCommunityIcons name={communicationOptIn ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color={communicationOptIn ? '#f27622' : '#888'} />
                <Text style={styles.termsText}>Yes, I would like to receive communications from Share our Strength</Text>
            </TouchableOpacity>
        </View>
    </>
);


export default function DonationModal({ visible, onClose }) {
  const insets = useSafeAreaInsets();
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  
  // State for the form
  const [step, setStep] = useState(1);
  const [previousStep, setPreviousStep] = useState(1);
  const [frequency, setFrequency] = useState('one-time');
  const [amount, setAmount] = useState(50);
  const [otherAmount, setOtherAmount] = useState('');
  const [isDedicated, setIsDedicated] = useState(false);
  const [dedicationType, setDedicationType] = useState('honor');
  const [dedicationName, setDedicationName] = useState('');
  const [notificationPreference, setNotificationPreference] = useState('email');
  const [coverFee, setCoverFee] = useState(false);
  const [accountType, setAccountType] = useState('checking');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [communicationOptIn, setCommunicationOptIn] = useState(true);

  // Animation functions
  const animateOpen = () => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 8, useNativeDriver: true })
    ]).start();
  };

  const animateClose = () => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 0.9, duration: 200, useNativeDriver: true })
    ]).start(() => {
        onClose();
        setTimeout(() => setStep(1), 300);
    });
  };

  useEffect(() => {
    if (visible) {
      animateOpen();
    }
  }, [visible]);
  
  const proceedToPaymentOptions = (currentStep) => {
      setPreviousStep(currentStep);
      setStep(4);
  }

  const handleContinue = () => {
    const currentStep = step;
    if (currentStep === 1) {
        if (isDedicated) { setStep(2); } 
        else if (frequency === 'one-time') { setStep(3); } 
        else { proceedToPaymentOptions(1); }
    } else if (currentStep === 2) {
        if (frequency === 'one-time') { setStep(3); } 
        else { proceedToPaymentOptions(2); }
    } else if (currentStep === 3) {
        proceedToPaymentOptions(3);
    } else if (currentStep === 5 || currentStep === 6) { // Coming from CC or Bank
        setPreviousStep(currentStep);
        setStep(7);
    } else if (currentStep === 7) { // Final submission
        console.log("Submitting donation...");
        animateClose();
    }
  };
  
  const toggleDedication = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDedicated(!isDedicated);
  }

  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
    setOtherAmount('');
    if (newFrequency === 'one-time') {
      setAmount(oneTimeAmounts[0]);
    } else {
      setAmount(monthlyAmounts[0]);
    }
  };
  
  const handleUpsellAccept = () => {
      setFrequency('monthly');
      proceedToPaymentOptions(3);
  };
  
  const handleUpsellDecline = () => {
      proceedToPaymentOptions(3);
  }

  const isContinueDisabled = step === 1 && isDedicated && !dedicationName.trim();

  if (!visible) {
    return null;
  }
  
  const getContinueButtonText = () => {
      if (step === 1) return `DONATE $${otherAmount || amount}`;
      if (step === 7) return `DONATE $${otherAmount || amount}`;
      return 'CONTINUE';
  }

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={animateClose} />
        
        <Animated.View style={[styles.modalContainer, { transform: [{ scale }], marginBottom: insets.bottom + 85 }]}>
            {isDedicated && dedicationName ? (
                <View style={styles.honorificHeader}>
                    <Text style={styles.honorificText}>
                        In {dedicationType === 'honor' ? 'Honor' : 'Memory'} Of {dedicationName}
                    </Text>
                </View>
            ) : null}
            <View style={styles.modalContent}>
                {step === 1 && (
                <DonateTodayStep 
                    frequency={frequency} amount={amount} otherAmount={otherAmount} isDedicated={isDedicated}
                    dedicationType={dedicationType} dedicationName={dedicationName} setFrequency={setFrequency}
                    setAmount={setAmount} setOtherAmount={setOtherAmount} toggleDedication={toggleDedication}
                    setDedicationType={setDedicationType} setDedicationName={setDedicationName}
                    handleFrequencyChange={handleFrequencyChange}
                />
                )}
                {step === 2 && <HonorGiftStep setStep={setStep} notificationPreference={notificationPreference} setNotificationPreference={setNotificationPreference} />}
                {step === 3 && <UpsellStep setStep={setStep} isDedicated={isDedicated} amount={amount} otherAmount={otherAmount} handleUpsellAccept={handleUpsellAccept} handleUpsellDecline={handleUpsellDecline}/>}
                {step === 4 && <PaymentOptionsStep setStep={setStep} frequency={frequency} amount={amount} otherAmount={otherAmount} coverFee={coverFee} setCoverFee={setCoverFee} previousStep={previousStep} />}
                {step === 5 && <CreditCardStep setStep={setStep} />}
                {step === 6 && <BankTransferStep setStep={setStep} accountType={accountType} setAccountType={setAccountType} agreeToTerms={agreeToTerms} setAgreeToTerms={setAgreeToTerms} />}
                {step === 7 && <PaymentInfoStep setStep={setStep} paymentMethodStep={previousStep} communicationOptIn={communicationOptIn} setCommunicationOptIn={setCommunicationOptIn}/>}
            </View>
        </Animated.View>

        {/* Hide continue button on Payment Options */}
        {step !== 4 && (
          <TouchableOpacity 
            style={[styles.continueButton, isContinueDisabled && styles.continueButtonDisabled, {bottom: insets.bottom + 15}]} 
            onPress={handleContinue}
            disabled={isContinueDisabled}
          >
              <Text style={styles.continueButtonText}>
                {getContinueButtonText()}
              </Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',    
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '90%', 
    borderRadius: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  modalContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 5,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    width: '100%',
  },
  freqContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 20,
  },
  freqButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
  },
  freqButtonSelected: {
    backgroundColor: '#f27622',
  },
  freqButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#555',
  },
  freqButtonTextSelected: {
    color: '#fff',
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amountButton: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountButtonSelected: {
    backgroundColor: '#333',
  },
  amountButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  amountButtonTextSelected: {
    color: '#fff',
  },
  otherAmountInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    width: '100%',
    textAlign: 'center',
  },
  dedicationContainer: {
    marginTop: 20,
  },
  dedicationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dedicationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  dedicationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    paddingLeft: 5, 
  },
  dedicationInputContainer: {
    marginTop: 20,
  },
  dedicationNameInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#f27622',
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  honorificHeader: {
      backgroundColor: '#f27622',
      padding: 10,
      alignItems: 'center',
  },
  honorificText: {
      color: '#fff',
      fontWeight: 'bold',
  },
  honorGiftQuestion: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      textAlign: 'center',
      marginVertical: 30,
  },
  honorGiftButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
  },
  honorGiftButton: {
      width: '48%',
  },
  upsellContent: {
      alignItems: 'center',
      padding: 20,
  },
  upsellText: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      lineHeight: 24,
      marginVertical: 20,
  },
  upsellSubtext: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 30,
  },
  upsellButton: {
    width: '100%',
    marginBottom: 10,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  upsellButtonDark: {
      backgroundColor: '#333',
  },
  upsellButtonOrange: {
      backgroundColor: '#f27622',
  },
  upsellButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
  },
  paymentContent: {
      padding: 10,
  },
  paymentAmountContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'baseline',
  },
  paymentAmount: {
      fontSize: 48,
      fontWeight: 'bold',
      color: '#333',
  },
  paymentCurrency: {
      fontSize: 20,
      color: '#888',
      marginLeft: 5,
  },
  paymentFrequency: {
      textAlign: 'center',
      color: '#f27622',
      fontWeight: 'bold',
      marginBottom: 20,
  },
  transactionCostsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      padding: 15,
      borderRadius: 8,
      marginVertical: 20,
  },
  transactionCostsText: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: '600',
  },
  feeDetailsContainer: {
      marginVertical: 10,
  },
  feeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
  },
  feeText: {
      color: '#666',
  },
  feeAmount: {
      fontWeight: '600',
  },
  paymentMethodButton: {
      backgroundColor: '#f27622',
      padding: 15,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
  },
  paymentMethodText: {
      color: '#fff',
      fontWeight: 'bold',
      marginRight: 10,
  },
  paymentForm: {
      padding: 10,
  },
  paymentInput: {
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      padding: 15,
      fontSize: 16,
      marginBottom: 10,
  },
  paymentInputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
  },
  cardIconsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      gap: 15,
  },
  cardIcon: {
      width: 50,
      height: 30,
      resizeMode: 'contain',
  },
  securityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
  },
  securityIcon: {
      width: 100,
      height: 40,
      resizeMode: 'contain',
      marginRight: 10,
  },
  securityText: {
      flex: 1,
      color: '#666',
      fontSize: 12,
  },
  linkText: {
      color: '#f27622',
      textDecorationLine: 'underline',
      marginBottom: 10,
  },
  termsContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 20,
  },
  termsText: {
      flex: 1,
      marginLeft: 10,
      color: '#666',
      fontSize: 12,
  }
});

