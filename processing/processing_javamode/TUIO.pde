import TUIO.*;
import java.util.ArrayList;

TuioProcessing tuioClient;

// Variabili globali che il tuo file artistico leggerà
ArrayList<TuioObject> fiduciali; // Lista dei fiduciali (f)
ArrayList<TuioCursor> cursori;   // Lista dei tocchi/cursori (c)

void setupMotore() {
  tuioClient = new TuioProcessing(this);
  fiduciali = new ArrayList<TuioObject>();
  cursori = new ArrayList<TuioCursor>();
}

void aggiornaDatiTUIO() {
  fiduciali = tuioClient.getTuioObjectList();
  cursori = tuioClient.getTuioCursorList();
}
