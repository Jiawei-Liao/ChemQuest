#include <SPI.h>
#include <MFRC522.h>
#include <SoftwareSerial.h>

#define SS_PIN1 10
#define RST_PIN1 9
#define SS_PIN2 8
#define RST_PIN2 7
#define SS_PIN3 6
#define RST_PIN3 5
#define SS_PIN4 4
#define RST_PIN4 3

#define BUTTON_PIN 2

MFRC522 mfrc522_1(SS_PIN1, RST_PIN1);
MFRC522 mfrc522_2(SS_PIN2, RST_PIN2);
MFRC522 mfrc522_3(SS_PIN3, RST_PIN3);
MFRC522 mfrc522_4(SS_PIN4, RST_PIN4);

boolean tagPresent_1 = false;
boolean tagPresent_2 = false;
boolean tagPresent_3 = false;
boolean tagPresent_4 = false;

int mfrc_counter1 = 5;
int mfrc_counter2 = 5;
int mfrc_counter3 = 5;
int mfrc_counter4 = 5;

boolean react = false;
unsigned long previousrfidMillis = 0;
const long rfidInterval = 300;
unsigned long previousButtonMillis = 0;
const long buttonInterval = 50;

void setup() {
  Serial.begin(9600);
  SPI.begin();

  mfrc522_1.PCD_Init();
  mfrc522_2.PCD_Init();
  mfrc522_3.PCD_Init();
  mfrc522_4.PCD_Init();
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  Serial.println("Ready");
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousrfidMillis >= rfidInterval) {
    previousrfidMillis = currentMillis;

    checkAndPrintUID(mfrc522_1, tagPresent_1, mfrc_counter1, 1);
    delay(10);
    checkAndPrintUID(mfrc522_2, tagPresent_2, mfrc_counter2, 2);
    delay(10);
    checkAndPrintUID(mfrc522_3, tagPresent_3, mfrc_counter3, 3);
    delay(10);
    checkAndPrintUID(mfrc522_4, tagPresent_4, mfrc_counter4, 4);
    Serial.println();
  }
  
  if (currentMillis - previousButtonMillis >= buttonInterval) {
    previousButtonMillis = currentMillis;
    if (digitalRead(BUTTON_PIN) != HIGH) {
      if (!react) {
        Serial.println("React");
      }
      react = true;
    } else {
      react = false;
    }
  }
}

void checkAndPrintUID(MFRC522 &rfid, boolean &tagPresent, int &mfrc_counter, int readerNumber) {
  boolean print = false;

  if (rfid.PICC_IsNewCardPresent()) {
    if (rfid.PICC_ReadCardSerial()) {
      if (!tagPresent) {
        tagPresent = true;
        mfrc_counter = 5;
        printUID(rfid.uid, readerNumber);
        print = true;
      }
    }
  } else {
    tagPresent = false;
  }

  if (!print) {
    mfrc_counter--;
    if (mfrc_counter < 0) {
      Serial.print("-" + String(readerNumber) + " ");
    } else {
      printUID(rfid.uid, readerNumber);
    }
  }
}

void printUID(MFRC522::Uid uid, int readerNumber) {
  String content = "";
  for (byte i = 0; i < uid.size; i++) {
    content.concat(String(uid.uidByte[i] < 0x10 ? "0" : ""));
    content.concat(String(uid.uidByte[i], HEX));
  }
  Serial.print(content);
  Serial.print("-");
  Serial.print(readerNumber);
  Serial.print(" ");
}
