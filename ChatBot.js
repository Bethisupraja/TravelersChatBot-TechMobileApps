import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';

function ChatBot() {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [language, setLanguage] = useState('English'); // Default language

  // Define colors for different languages
  const languageColors = {
    English: '#66ccff', // Light blue
    Spanish: '#ffcc66', // Light orange
    French: '#66ff66',  // Light green
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    let temp1 = chatHistory;
    temp1.push({ text: inputText, isUser: true, lang: 'English' });
    setChatHistory(temp1);

    const response = generateResponse(inputText, language);
    let temp = chatHistory;
    temp.push({ text: response, isUser: false, lang: language });
    setChatHistory(temp);
    setInputText('');
  };

  function generateResponse (input, lang) {
    // Simulate language learning content
    const learningContent = {
      English: {
        greetings: 'Hello! How can I help you?',
        howAreYou: "I'm fine, thank you! How about you?",
        goodbye: 'Goodbye! Have a nice day!',
      },
      Spanish: {
        greetings: '¡Hola! ¿Cómo puedo ayudarte?',
        howAreYou: '¡Estoy bien, gracias! ¿Y tú?',
        goodbye: '¡Adiós! ¡Que tengas un buen día!',
      },
      French: {
        greetings: 'Bonjour! Comment puis-je vous aider?',
        howAreYou: 'Je vais bien, merci! Et vous?',
        goodbye: 'Au revoir! Bonne journée!',
      }
    };

    // Simulate translation
    const translatedContent = {
      English: {
        '¡Hola! ¿Cómo puedo ayudarte?': 'Hello! How can I help you?',
        '¡Estoy bien, gracias! ¿Y tú?': "I'm fine, thank you! How about you?",
        '¡Adiós! ¡Que tengas un buen día!': 'Goodbye! Have a nice day!',
      },
      Spanish: {
        'Hello! How can I help you?': '¡Hola! ¿Cómo puedo ayudarte?',
        "I'm fine, thank you! How about you?": '¡Estoy bien, gracias! ¿Y tú?',
        'Goodbye! Have a nice day!': '¡Adiós! ¡Que tengas un buen día!',
        'Excuse me, can you tell me how to get to the nearest metro station?':
          'Disculpe, ¿puede decirme cómo llegar a la estación de metro más cercana?',
        'Can you please show me the way to the museum?': '¿Puede mostrarme el camino hacia el museo, por favor?',
        'Where is the nearest bus stop?': '¿Dónde está la parada de autobús más cercana?',
        'Could you recommend a good restaurant nearby?': '¿Podría recomendarme un buen restaurante cercano?',
        'Where can I find a shopping mall?': '¿Dónde puedo encontrar un centro comercial?',
        'I would like to buy some souvenirs. Where can I find a souvenir shop?':
          'Me gustaría comprar algunos recuerdos. ¿Dónde puedo encontrar una tienda de recuerdos?',
      },
      French: {
        'Hello! How can I help you?': 'Bonjour! Comment puis-je vous aider?',
        "I'm fine, thank you! How about you?": 'Je vais bien, merci! Et vous?',
        'Goodbye! Have a nice day!': 'Au revoir! Bonne journée!',
        'Excuse me, can you tell me how to get to the nearest metro station?':
          'Excusez-moi, pouvez-vous me dire comment me rendre à la station de métro la plus proche?',
        'Can you please show me the way to the museum?': 'Pouvez-vous me montrer le chemin vers le musée, s\'il vous plaît?',
        'Where is the nearest bus stop?': 'Où se trouve l\'arrêt de bus le plus proche?',
        'Could you recommend a good restaurant nearby?': 'Pourriez-vous me recommander un bon restaurant à proximité?',
        'Where can I find a shopping mall?': 'Où puis-je trouver un centre commercial?',
        'I would like to buy some souvenirs. Where can I find a souvenir shop?':
          'Je voudrais acheter quelques souvenirs. Où puis-je trouver une boutique de souvenirs?',
      },
    };

    // Simulate chatbot responses
    if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
      return learningContent[lang].greetings;
    } else if (input.toLowerCase().includes('how are you')) {
      return learningContent[lang].howAreYou;
    } else if (input.toLowerCase().includes('goodbye') || input.toLowerCase().includes('bye')) {
      return learningContent[lang].goodbye;
    } else {
      // Simulate translation
      if (translatedContent[lang][input]) {
        return translatedContent[lang][input];
      } else {
        return "I'm sorry, I didn't understand that.";
      }
    }
  };
console.log("input",language);
console.log(languageColors);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {chatHistory && chatHistory.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessage : styles.botMessage, 
              {backgroundColor: message.isUser ? '#66ccff' : languageColors[message.lang]}
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
      <View style={styles.languageContainer}>
        <Text style={styles.languageText}>Language:</Text>
        {Object.keys(languageColors).map(language1 => (
          <Button
            key={language1}
            title={language1}
            onPress={() => setLanguage(language1)}
            color={languageColors[language1]} // Set button color based on language
            style={{fontWeight: language1 === language ? 'bold' : 'normal'}}
            
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignContent: 'center'
  },
  chatContainer: {
    paddingTop: 40,
    paddingHorizontal:10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#66ccff',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#cceeff',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  languageText: {
    marginRight: 10,
  },
});

export default ChatBot;
