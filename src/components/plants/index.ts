import { PlantProps } from './plantBase'
import * as Joy from './JoyPlants'
import * as Sad from './SadPlants'
import * as Angry from './AngryPlants'
import * as Fear from './FearPlants'
import * as Excited from './ExcitedPlants'
import * as Proud from './ProudPlants'
import * as Bored from './BoredPlants'
import * as Calm from './CalmPlants'

export type { PlantProps } from './plantBase'

// 식물 ID → SVG 컴포넌트 매핑 (60종)
export const PLANT_COMPONENTS: Record<string, React.FC<PlantProps>> = {
  // joy
  sunshine_dandelion: Joy.SunshineDandelion,
  yellow_laughflower: Joy.YellowLaughflower,
  giggle_balloonvine: Joy.GiggleBalloonvine,
  rainbow_sunflower: Joy.RainbowSunflower,
  starlight_joytree: Joy.StarlightJoytree,
  golden_smilerose: Joy.GoldenSmilerose,
  angel_laughflower: Joy.AngelLaughflower,
  diamond_joygem: Joy.DiamondJoygem,
  // sad
  moonlight_tearflower: Sad.MoonlightTearflower,
  blue_sighmoss: Sad.BlueSighmoss,
  rainy_bellflower: Sad.RainyBellflower,
  mist_memoryflower: Sad.MistMemoryflower,
  deepsea_pearlflower: Sad.DeepseaPearlflower,
  star_tearflower: Sad.StarTearflower,
  comfort_rainbow: Sad.ComfortRainbow,
  healing_lily: Sad.HealingLily,
  // angry
  lava_cactus: Angry.LavaCactus,
  flame_thornbush: Angry.FlameThornbush,
  storm_lightningflower: Angry.StormLightningflower,
  volcano_bud: Angry.VolcanoBud,
  dragon_scaleplant: Angry.DragonScaleplant,
  peace_olive: Angry.PeaceOlive,
  justice_swordflower: Angry.JusticeSwordflower,
  // fear
  shadow_mushroom: Fear.ShadowMushroom,
  firefly_lampgrass: Fear.FireflyLampgrass,
  shield_spiderweb: Fear.ShieldSpiderweb,
  dark_lighthouseflower: Fear.DarkLighthouseflower,
  starlight_armortree: Fear.StarlightArmortree,
  courage_lionmane: Fear.CourageLionmane,
  guardian_angeltree: Fear.GuardianAngeltree,
  // excited
  sparkle_blossom: Excited.SparkleBlossom,
  thump_heartflower: Excited.ThumpHeartflower,
  firework_flameflower: Excited.FireworkFlameflower,
  stardust_waterfallflower: Excited.StardustWaterfallflower,
  firstlove_cherryblossom: Excited.FirstloveCherryblossom,
  adventurer_flagtree: Excited.AdventurerFlagtree,
  destiny_starflower: Excited.DestinyStarflower,
  dream_goldentree: Excited.DreamGoldentree,
  // proud
  medal_sunflower: Proud.MedalSunflower,
  goldmedal_dandelion: Proud.GoldmedalDandelion,
  glory_laurelflower: Proud.GloryLaurelflower,
  champion_trophyflower: Proud.ChampionTrophyflower,
  crown_rose: Proud.CrownRose,
  hall_of_fame_tree: Proud.HallOfFameTree,
  solomon_wisdomflower: Proud.SolomonWisdomflower,
  hero_footprint: Proud.HeroFootprint,
  // bored
  cloud_moss: Bored.CloudMoss,
  yawn_balloonmoss: Bored.YawnBalloonmoss,
  time_sandflower: Bored.TimeSandflower,
  dreaming_cottoncandytree: Bored.DreamingCottoncandytree,
  imagination_fountain: Bored.ImaginationFountain,
  inventor_garden: Bored.InventorGarden,
  curiosity_paradise: Bored.CuriosityParadise,
  // calm
  calm_lotus: Calm.CalmLotus,
  wind_chimegrass: Calm.WindChimegrass,
  lake_mirrorflower: Calm.LakeMirrorflower,
  meditation_bodhitree: Calm.MeditationBodhitree,
  enlightenment_whitelotus: Calm.EnlightenmentWhitelotus,
  thousand_year_silencetree: Calm.ThousandYearSilencetree,
  heart_essenceflower: Calm.HeartEssenceflower
}
