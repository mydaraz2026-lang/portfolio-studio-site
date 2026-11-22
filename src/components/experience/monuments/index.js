import Gateway from './Gateway';
import Monoliths from './Monoliths';
import Orbit from './Orbit';
import Nodes from './Nodes';
import Crystal from './Crystal';
import Ascent from './Ascent';
import Beacon from './Beacon';
import Showcase from './Showcase';
import Audit from './Audit';
import Phone from './Phone';
import Studio from './Studio';
import MediaKit from './MediaKit';
import Bubbles from './Bubbles';
import Emergence from './Emergence';

/**
 * Monument registry — the `monument` field of a milestone stop picks one of these.
 * To add a new sculpture: create a component that accepts { accent, focus, groundY }
 * and register it here.
 */
export const MONUMENTS = {
  gateway: Gateway,
  monoliths: Monoliths,
  orbit: Orbit,
  nodes: Nodes,
  crystal: Crystal,
  ascent: Ascent,
  beacon: Beacon,
  showcase: Showcase,
  audit: Audit,
  phone: Phone,
  studio: Studio,
  mediakit: MediaKit,
  bubbles: Bubbles,
  emergence: Emergence,
};
