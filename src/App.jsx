import { useState, useCallback, useRef, useEffect } from "react";

const QUESTIONS = {"Anchoring & Mooring":[{"q":"What checks and equipment would you expect to find on the forward mooring deck?","s":"","m":""},{"q":"You are in charge of the mooring deck while heading to anchor. Explain the procedures you would follow.","s":"","m":""},{"q":"Describe the procedure for letting go the anchor. What are the dangers involved?","s":"","m":""},{"q":"How would you carry out a safe mooring operation?","s":"","m":""},{"q":"You are in charge of the aft mooring station and the ship is ready to cast off. How would you proceed?","s":"","m":""},{"q":"What tests and checks should be carried out before anchoring?","s":"","m":""},{"q":"How would you know the number of shackles on deck from the anchor cable markings?","s":"","m":"","tip":"Know the colour coding system cold — examiners show pictures. Red painted kenter shackle = joining shackle. Count the white links either side to determine how many shackles are on deck."},{"q":"What types of mooring ropes are used on board? What are the advantages and disadvantages of each?","s":"","m":""},{"q":"The vessel is alongside and you need to adjust the mooring lines. How would you safely conduct this?","s":"","m":""},{"q":"Explain the dangers of snap-back zones during mooring operations.","s":"","m":""},{"q":"What factors would you consider when choosing an anchorage position?","s":"","m":""},{"q":"What is the swinging circle and how would you calculate it?","s":"","m":""},{"q":"How would you know if the anchor is dragging? What actions would you take?","s":"","m":""},{"q":"Why should the windlass be left out of gear when at anchor?","s":"","m":"","tip":"The specific answer examiners want: if the ship suffers a blackout, the windlass can still be operated. Multiple candidates didn't know this."},{"q":"Describe the components of an anchor cable, including the kenter shackle. How are the cable markings arranged?","s":"","m":"","tip":"One examiner showed a picture of a kenter shackle painted red and asked 'I have 8 white common links — how many shackles on deck?' You need to know the marking system precisely."},{"q":"Why is an anchor left out of gear when cleared away? What is the full procedure for clearing away the anchor?"},{"q":"How would you know when the anchor is brought up?"},{"q":"How would you conduct a toolbox talk with the crew when in charge of the forward station for an anchor drop?"},{"q":"What are the hazards associated with mooring operations?"},{"q":"You are in charge of the forward mooring station. Explain your procedures and safety considerations."},{"q":"A crew member attempts to adjust mooring lines. What should they have done first? What action would you take?"},{"q":"Where would you find information about safe mooring operations?"},{"q":"What checks do you carry out when rigging the gangway? Where would you find the requirements?"}],"COLREGS & Rules of the Road":[{"q":"How do you know if a Traffic Separation Scheme (TSS) is adopted by the IMO?","s":"","m":""},{"q":"You are a power-driven vessel (PDV) and a vessel engaged in fishing is crossing from your starboard side. What are your actions?","s":"","m":""},{"q":"You are a PDV and a vessel constrained by her draught (CBD) is crossing from your port side. What are your actions?","s":"","m":""},{"q":"You are a PDV and also a vessel restricted in her ability to manoeuvre (RAM). A sailing vessel wants to overtake you. What are your obligations?","s":"","m":""},{"q":"You are in restricted visibility. What actions would you take?","s":"","m":""},{"q":"A vessel not under command (NUC) is crossing from port to starboard, and you are a CBD vessel. What are your actions?","s":"","m":""},{"q":"What are all the factors that determine safe speed as per Rule 6 of COLREGS — for all vessels and for vessels with operational radar?","s":"","m":"","tip":"Examiners want ALL factors — don't stop at 3 or 4. There are factors for all vessels AND additional ones for vessels with operational radar. They will keep pushing until you've listed every one."},{"q":"A vessel engaged in fishing with gear extending more than 150m is right ahead, and a tug towing an oil tanker showing RAM day shapes is on your port bow. What are the day shapes, night lights, and fog signals for each? What are your actions?","s":"","m":""},{"q":"Can a vessel cross a Traffic Separation Scheme? If so, how should it be done?","s":"","m":""},{"q":"Which vessels are allowed to use the Separation Zone and the Inshore Traffic Zone?","s":"","m":""},{"q":"What is meant by a vessel Not Under Command (NUC)? Give examples of when a vessel may be NUC.","s":"","m":""},{"q":"What is meant by a vessel Constrained by her Draught (CBD)? What is the day shape for a CBD vessel?","s":"","m":""},{"q":"Explain where COLREGS apply, with reference to Rule 1(a).","s":"","m":""},{"q":"You observe a PDV on your starboard bow. How would you determine if risk of collision exists, and what action would you take?","s":"","m":""},{"q":"A RAM vessel is on your port side. What are your actions? Can you alter course to port?","s":"","m":""},{"q":"Who can use the inshore traffic zone and under what circumstances?","s":"","m":""},{"q":"Under what Rule would you take action when you encounter a CBD vessel?","s":"","m":""},{"q":"An overtaking vessel is 3 miles away. You hear a sound signal — what is it and what action would you take?","s":"","m":""},{"q":"A CBD vessel is crossing from your port side. Can you alter course to port? Why or why not?","s":"","m":""},{"q":"You alter course to avoid a PDV crossing from starboard in a TSS, but your alteration takes you outside the TSS lane. How would you rejoin?","s":"","m":""},{"q":"Two vessels are shown crossing a TSS. Which one is crossing correctly and why?","s":"","m":""},{"q":"What rules apply specifically in restricted visibility?","s":"","m":""},{"q":"Draw and explain the flammability diagram as found in ISGOTT. How is it used?","s":"","m":""},{"q":"You are making way in restricted visibility and decide to stop engines. What change must you make to your fog signal?","s":"","m":"","tip":"Candidates forgot this: when you stop engines, your fog signal changes to TWO prolonged blasts at intervals of not more than 2 minutes (instead of one). Simple but easy to miss under pressure."},{"q":"If a crossing situation occurs in restricted visibility within a TSS (e.g. Dover Strait), would your actions be any different to open water? Explain with reference to Rule 10 and Rule 19.","s":"","m":"","tip":"Rule 10 and Rule 19 apply simultaneously. One candidate credited knowing MGN 364–369 with saving them here. Cross-reference Dover Strait specific guidance."},{"q":"A RAM vessel is on your starboard side. What are your actions?","s":"","m":""},{"q":"A PDV is on your port side. What are your actions?","s":"","m":""},{"q":"A RAM vessel is crossing from your port side. What are your actions?","s":"","m":""},{"q":"You are crossing a TSS and a PDV is on your port side. What are your actions?","s":"","m":""},{"q":"What is the hierarchy of vessels under Rule 18? Who gives way to whom?","s":"","m":""},{"q":"Explain the difference between a head-on situation and a crossing situation. How do you distinguish between them at night?","s":"","m":""},{"q":"What sound signals would you expect to hear from a vessel at anchor in restricted visibility?","s":"","m":""},{"q":"Under Rule 19, a vessel is detected by radar alone forward of the beam. What actions should you avoid and why?","s":"","m":"","tip":"Rule 19 is the single most-referenced rule in these exams (25+ times across reports). Know the restrictions: avoid altering to port for a vessel forward of the beam, avoid altering towards a vessel abeam or abaft the beam."},{"q":"You are overtaking in a narrow channel. What is the full procedure including sound signals?"},{"q":"A PDV is overtaking you and not giving way. What are your actions? Would you consider using VHF?"},{"q":"Explain Rule 19(d) in detail. What does it say about vessels detected by radar alone?"},{"q":"Explain Rule 19(e). You hear a fog signal forward of the beam but cannot detect the vessel on radar. What are your actions?"},{"q":"A fishing vessel and a sailing vessel meet. Who gives way to whom?"},{"q":"A sailing vessel with a cone pointing downward is on your starboard side. What does this mean and what are your actions?"},{"q":"Can a vessel engaged in fishing (VEIF), NUC, or RAM be at anchor? What lights would they show?"},{"q":"A PDV is crossing from starboard, bearing 22.5° abaft the beam. Is this a crossing or overtaking situation?"},{"q":"A towing vessel with a tow length exceeding 200m is on your port side. What are your actions? What is the sound signal and arc of visibility of the masthead lights?"},{"q":"A vessel over 100m is aground ahead within port limits. What is the sound signal? What are your actions?"},{"q":"A sailing vessel ahead is using additional masthead lights and being blown to port. What are your actions and why?"},{"q":"What is the difference between a PANPAN and a MAYDAY?"},{"q":"What is the minimum distance between day shapes on a vessel?"},{"q":"The give-way vessel does not take action. At what point do you, as the stand-on vessel, act? Under which rule?"},{"q":"A PDV is nearly head-on 5 nautical miles away in a narrow channel. What are your actions?"}],"Cargo Operations (General/Bulk/Container)":[{"q":"What are the main concerns and hazards when loading bulk cargo?","s":"","m":""},{"q":"You are on a general cargo vessel with a bosun and 3 ABs at your disposal. How would you organise deck cargo operations?","s":"","m":""},{"q":"A banksman at the gangway is antisocial and refuses to provide ID. What are your actions?","s":"","m":"","tip":"Escort them off the vessel. Don't overthink this one — examiners want a firm, decisive answer about denying access and informing the duty officer."},{"q":"How would you take over a cargo watch?","s":"","m":""},{"q":"You are on a bulk carrier. Describe your duties during cargo discharge in port.","s":"","m":""},{"q":"The Chief Officer instructs the Bosun to inspect a tank after discharge. What procedures should be followed?","s":"","m":""},{"q":"What are the important cargo characteristics of bulk cargoes — specifically moisture content, TML, and angle of repose?","s":"","m":""},{"q":"What are the hazards associated with loading iron ore?","s":"","m":""},{"q":"You are loading containers. What are your duties during a cargo watch?","s":"","m":""},{"q":"You see a spill coming from a container. What are your actions?","s":"","m":""},{"q":"What information would you expect to find on containers carrying dangerous goods?","s":"","m":""},{"q":"What information would you find in the loading plan?","s":"","m":""},{"q":"An AB wants to discharge food waste overboard. What would you tell them?","s":"","m":""},{"q":"How are cargo operations safely carried out? What are the key safety considerations?","s":"","m":""},{"q":"What is the Dangerous Goods Code? How did you deal with DG cargo on your last vessel?","s":"","m":""},{"q":"The cook calls and wants to discharge food waste. You are 15 nautical miles offshore in the Mediterranean. What will you tell them?","s":"","m":"","tip":"The Med is a Special Area under MARPOL Annex V. Food waste must be comminuted/ground and you must be 12nm+ from land. Know the specific discharge criteria — examiners test Annex V Special Area rules frequently."},{"q":"You are on a bulk carrier. What bridge equipment would you expect to have on board?","s":"","m":""},{"q":"How would you know if cargo is being secured properly? What publication would you refer to?","s":"","m":""},{"q":"You are about to start your cargo watch loading coal. What information would you expect in the handover?","s":"","m":""},{"q":"The Bosun calls and asks if he can discharge the ship's garbage while in open sea. What are the requirements?","s":"","m":""},{"q":"Your ship is loading steel coils. How will you maintain your port cargo watch as OOW?","s":"","m":""},{"q":"What dangers or difficulties might you face while loading steel coils?","s":"","m":""},{"q":"During steel coil loading, the mooring lines become slack. How will you safely tighten them?","s":"","m":""},{"q":"When loading iron ore, what specific hazards should you be aware of?","s":"","m":""},{"q":"If the ballast water treatment system breaks during cargo operations, what are your actions?","s":"","m":""},{"q":"During a cargo watch on a tanker, there is a leak at the manifold. What are your actions?","s":"","m":""},{"q":"Why might the Chief Officer be interested in relative humidity with relation to cargo during a voyage?","s":"","m":""},{"q":"What would you monitor in the Cargo Control Room (CCR) while on cargo watch?","s":"","m":""},{"q":"How would you take over a cargo watch on a tanker vessel? What checks would you carry out at the manifold?","s":"","m":""},{"q":"What checks should be made to the hold prior to loading steel coils? Where would you find information on stowage?","s":"","m":""},{"q":"The Chief Engineer wants to discharge untreated sewage. What are the regulatory requirements?","s":"","m":""},{"q":"What are the procedures for connecting cargo arms to the manifold?","s":"","m":""},{"q":"What precautions are taken during discharging operations, particularly near the cargo pump area?","s":"","m":""},{"q":"How would you know that cargo is properly secured on a container ship? What is the Cargo Securing Manual?","s":"","m":""},{"q":"A container is found to be leaking a limited quantity substance. How would you check and deal with it?","s":"","m":""},{"q":"What legislation governs chemical cargo? What are the contents and categories in the IBC Code?","s":"","m":""},{"q":"What is the purpose of a hygrometer in cargo holds on a bulk carrier?","s":"","m":""},{"q":"What is cargo sweat and ship sweat? How can you predict and prevent them?","s":"","m":"","tip":"When asked about Stevenson screens, examiners also wanted to hear about cargo sweat and ship sweat — not just weather prediction. Link the hygrometer/dew point to cargo care."},{"q":"What are the stowage and segregation requirements for IMDG cargo? How would you use the IMDG Code to stow a DG container?","s":"","m":""},{"q":"What lifting equipment is used for the bunkering hose? How do you verify its safe working load (SWL)?","s":"","m":""},{"q":"Your vessel is loading a homogeneous fertiliser cargo. What are your duties and concerns during the cargo watch?"},{"q":"What is the angle of repose? Why is it important for bulk cargoes?"},{"q":"Where would you find the cargo properties for a bulk cargo? What is the IMSBC Code?"},{"q":"If a bulk cargo had a chemical hazard, which category would it fall under in the IMSBC Code?"},{"q":"What are high-density cargoes? How would you undertake cargo operations with them?"},{"q":"You are loading iron ore and conducting ballasting simultaneously. How would you perform your cargo watch?"},{"q":"The bulk cargo has been sitting on the quayside and it has rained. What are your concerns?"},{"q":"How would you search for a specific cargo using its UN number?"},{"q":"Explain the cargo operations on a car carrier. How do you maintain progress along the cargo plan?"},{"q":"What happens to a timber cargo when it gets wet? What does the timber cargo securing need to allow?"},{"q":"What is the timber cargo securing method?"},{"q":"The Chief Officer gives you the final draught measurements. What would you do with this information?"},{"q":"You notice a sudden list or trim change during loading. What could this be and what are your actions?"}],"Compass & Position Fixing":[{"q":"What is a gyrocompass? Describe its main components and how it works.","s":"","m":""},{"q":"Identify the parts of a magnetic compass, including Kelvin spheres and correcting magnets.","s":"","m":""},{"q":"What is a Vertical Sextant Angle (VSA)? How would you take one and what information does it give you?","s":"","m":"","tip":"Don't forget to mention you must correct for index error AND height of eye from the almanac. Candidates who skipped the corrections lost marks."},{"q":"If the gyrocompass fails, what would you do? What other equipment is affected?","s":"","m":""},{"q":"How would you calculate the current year's variation from a chart compass rose?","s":"","m":""},{"q":"What is a deviation card? When would you need to create a new one?","s":"","m":""},{"q":"Explain the difference between deviation and variation.","s":"","m":""},{"q":"How would you determine compass error, and how often should you check it?","s":"","m":""},{"q":"How can compass error be determined using a transit, amplitude, and azimuth?","s":"","m":""},{"q":"Identify a sextant and describe its uses. What are the correctable and non-correctable errors?","s":"","m":""},{"q":"Why does deviation change? What causes it to vary?","s":"","m":""},{"q":"Where do you obtain deviation information?","s":"","m":""},{"q":"Why is it important to regularly check deviation?","s":"","m":""},{"q":"How would you check compass error using a transit bearing?","s":"","m":"","tip":"Examiners like the 'easy route' — explaining a transit bearing is the simplest method. But also know amplitude and azimuth methods for when a transit isn't available."},{"q":"You are in deep sea at 0100 hours. How would you check your compasses?","s":"","m":"","tip":"This catches people out because there's no transit available at night in open ocean. The answer is celestial — amplitude or azimuth of a celestial body. Know both methods."},{"q":"What are all the correctable errors on a sextant? Explain how you would correct each one.","s":"","m":""},{"q":"Explain how you would carry out celestial navigation in deep sea.","s":"","m":""},{"q":"The compass is giving incorrect bearings. How would you determine the compass error?","s":"","m":""},{"q":"How would you know if your GPS is working correctly? What is DOP?","s":"","m":""},{"q":"How do you read the index error from a sextant's arc and micrometer drum?","s":"","m":""},{"q":"How would you cross-check your GNSS position using other means?","s":"","m":""},{"q":"What must you do to a sextant before using it?","s":"","m":""},{"q":"How would you determine compass error while in open sea?","s":"","m":""},{"q":"Given a compass bearing, deviation, and variation — calculate the true bearing and the compass error.","s":"","m":""},{"q":"Given a gyro bearing, calculate the gyro error. How would you apply this error?","s":"","m":""},{"q":"How would you fix your position using a celestial body?","s":"","m":""},{"q":"What type of gyrocompass was on your last vessel? What is gyro speed error?","s":"","m":""},{"q":"Explain DGPS, Ground-Based Augmentation Systems (GBAS), and Satellite-Based Augmentation Systems (SBAS).","s":"","m":""},{"q":"What are the limitations of DGPS?","s":"","m":""},{"q":"From where do you obtain the height of eye for sextant corrections?","s":"","m":""},{"q":"How frequently should you check compass and gyro error in pilotage waters?","s":"","m":"","tip":"This is described as a 'trick question' in one report. The answer is: every watch and after every major alteration of course. In pilotage waters, check more frequently — essentially continuously."},{"q":"What is the use of an echo sounder for position fixing?","s":"","m":""},{"q":"When does a magnetic compass need to be adjusted or swung?","s":"","m":""},{"q":"What should you do if the master gyrocompass and gyro repeaters are not aligned?","s":"","m":""},{"q":"What are the errors and limitations of GPS?","s":"","m":"","tip":"Cover all of them: propagation delay, multipath, spoofing, HDOP/PDOP, satellite geometry, jamming. Examiners keep asking 'what else?' until you've exhausted the list."},{"q":"How do you convert a compass bearing to a true bearing?","s":"","m":""},{"q":"What are the methods of position fixing in coastal waters during daytime and at night?","s":"","m":""},{"q":"Explain luminous range, nominal range, and geographical range. Which appears on paper charts?","s":"","m":""},{"q":"How would you fix your position using sector lights?","s":"","m":""},{"q":"What is the difference between an azimuth and an amplitude?","s":"","m":"","tip":"Examiners use this as a quick-fire test. Azimuth = bearing of a celestial body at any time. Amplitude = bearing at rising or setting only. Don't mix them up."},{"q":"How does a magnetic compass get affected by external factors? How would you correct for these?"},{"q":"Will the variation be the same everywhere? Why does it change?"},{"q":"How would you fix your position during a coastal passage without GPS? Name all methods."},{"q":"How does transverse thrust work? How does it affect vessel handling?"},{"q":"How would you know the magnetic compass magnets are in the correct position?"},{"q":"A compass bearing reads 312° and the true bearing is 315°. What is the compass error?"},{"q":"Shown a compass — how would you inspect it? How would you fix a bubble in the compass bowl?"},{"q":"What VSA corrections are needed? Where do you measure the lighthouse height from?"}],"Dangerous Goods (IMDG)":[{"q":"How many dangerous goods classes are there under the IMDG Code? Name them.","s":"","m":""},{"q":"What certification would a ship carrying dangerous goods require?","s":"","m":""},{"q":"You are shown an IMDG Class 8 (Corrosive) placard. What code would you refer to for more information?","s":"","m":""},{"q":"What information is contained in the IMDG Code?","s":"","m":""},{"q":"A DG spill comes into contact with a crew member. What publication would you refer to for medical guidance?","s":"","m":""},{"q":"Describe the IMDG Code — its classes, contents, and the actions to take in the event of a spill.","s":"","m":""},{"q":"What is a Dangerous Goods Declaration? What information does it contain?","s":"","m":""},{"q":"How would you determine the segregation requirements for two different classes of dangerous goods?","s":"","m":""},{"q":"What is the EmS (Emergency Schedule) Guide and when would you use it?","s":"","m":""},{"q":"What is the MFAG (Medical First Aid Guide) and how does it relate to dangerous goods?","s":"","m":""},{"q":"What certifications does a vessel require when carrying dangerous goods?"},{"q":"A container is spilling DG and a crew member is found unconscious near it. What are your actions?"},{"q":"How would you use the IMDG Code to look up cargo information using a UN number?"},{"q":"What is the Dangerous Goods Certificate for Solid Bulk cargoes?"}],"ECDIS & Electronic Navigation":[{"q":"Your vessel is fully ECDIS-fitted. What documents are you required to carry? What happens if you don't have them?","s":"","m":""},{"q":"How would you calculate the safety contour on ECDIS?","s":"","m":"","tip":"This comes up in almost every exam. Know the formula: ship's draught + squat + UKC + height of tide (negative). Be able to walk through a worked example."},{"q":"How would you calculate the safety depth on ECDIS? What is the difference between safety contour and safety depth?","s":"","m":""},{"q":"What is NAVTEX? Explain its purpose, frequencies, and how to set it up.","s":"","m":""},{"q":"What certificate do you need to operate ECDIS? Do you need a type-specific certificate?","s":"","m":""},{"q":"If you don't have ECDIS type-specific training, what can't you do on board?","s":"","m":"","tip":"Don't just say 'take the watch.' One candidate failed this point — the examiner wanted BOTH: you cannot keep a navigational watch AND you cannot do passage planning."},{"q":"How would you set up ECDIS for departure?","s":"","m":"","tip":"This appears in nearly every exam. Cover ALL safety settings: safety contour, safety depth, shallow contour, deep contour. Be ready to calculate each one with actual numbers."},{"q":"What are the safety parameters and settings on ECDIS?","s":"","m":""},{"q":"What is the difference between X-band and S-band radar?","s":"","m":""},{"q":"What would you check regarding ECDIS and radar during a watch handover?","s":"","m":""},{"q":"How do you check if the ECDIS charts (ENCs) are up to date?","s":"","m":""},{"q":"What are the ECDIS alarms? Which are mandatory alarms requiring immediate action?","s":"","m":""},{"q":"What should you do if there is no ENC coverage for your area of navigation?","s":"","m":"","tip":"Talk about RCDS mode (Raster Chart Display System) and the requirement to carry paper charts as backup. Know the additional requirements when operating in RCDS mode."},{"q":"Explain how the presence of a pilot affects OOW responsibilities.","s":"","m":""},{"q":"What is the difference between list and loll?","s":"","m":"","tip":"Examiners love this. List = caused by off-centre weight, corrected by moving weight. Loll = caused by negative GM, vessel is unstable — DO NOT add ballast to the high side. The correction methods are opposite and getting it wrong could capsize the vessel."},{"q":"What is the difference between underway and making way?","s":"","m":"","tip":"Underway = not at anchor, not made fast, not aground. Making way = actually moving through the water under propulsion. A vessel can be underway but NOT making way (e.g. stopped but drifting)."},{"q":"Explain the difference between sea-stabilised and ground-stabilised radar modes. When would you use each?","s":"","m":""},{"q":"How would you set up ECDIS for passage planning? How do you plan a great circle route on ECDIS?","s":"","m":""},{"q":"You see an emergency wreck buoy ahead on ECDIS. What are your actions?","s":"","m":""},{"q":"How would you calculate your safety contour? Walk me through the process.","s":"","m":""},{"q":"What is the difference between a relative vector and a true vector on radar/ECDIS?","s":"","m":""},{"q":"Which countries are in IALA Region A? What are the differences between Region A and Region B?","s":"","m":""},{"q":"How would you set up ECDIS if it is not receiving a GPS signal?","s":"","m":""},{"q":"What are the ECDIS carriage requirements?","s":"","m":""},{"q":"If you are crossing a safety contour on ECDIS, will it generate an alarm or an indication?","s":"","m":""},{"q":"Explain the ENC data standard (S-57/S-101) and symbology standard (S-52).","s":"","m":""},{"q":"What is updated in ECDIS — the system software or the chart data? How?","s":"","m":""},{"q":"What are the requirements when operating ECDIS in RCDS (Raster Chart Display System) mode?","s":"","m":""},{"q":"What is shown by a question mark symbol on ECDIS? What does it mean?","s":"","m":"","tip":"One candidate had no idea and failed this. It means the ECDIS symbology hasn't been updated or there's an object the system can't display properly. Check Chart 5011/INT 1."},{"q":"What is the difference between ECDIS alarms and ECDIS indications? Give examples of each.","s":"","m":""},{"q":"What are the limitations and errors of ECDIS?"},{"q":"What are the three main inputs for ECDIS?"},{"q":"What will happen to ECDIS if GPS fails?"},{"q":"During route check on ECDIS, you are getting multiple alarms. Which parameters should you check? What is XTD?"},{"q":"What checks would you carry out on ECDIS during your watch?"},{"q":"What is an unstabilised radar display? When might you encounter one?"},{"q":"How would you know your ECDIS is showing correct and accurate information?"},{"q":"Explain the differences between vector charts (ENC) and raster charts (RNC) on ECDIS."},{"q":"What are the default safety settings of an ECDIS if you forget to input them for your passage plan?","s":"","m":"","tip":"Defaults vary by manufacturer but are typically 0m or shallowest possible. Always set them manually."},{"q":"Explain the ENC cell naming convention for electronic charts.","s":"","m":""}],"Emergencies & SAR":[{"q":"There is a man overboard (MOB) on the starboard side. What are your immediate actions as OOW?","s":"","m":""},{"q":"Explain the Williamson Turn and the Anderson Turn for MOB recovery. When would you use each?","s":"","m":"","tip":"Williamson = delayed action, brings you back on reciprocal course (good if MOB not immediately noticed). Anderson = immediate, tighter turn (good if MOB seen falling). Know both cold."},{"q":"Where would you find information on search and rescue operations? What publication?","s":"","m":""},{"q":"The MOB has been rescued and is back on board. What medical attention should be given? What resources do you have on board?","s":"","m":""},{"q":"What actions should be taken during a blackout at sea?","s":"","m":""},{"q":"You have participated in a SAR operation. What is the role of the On-Scene Commander?","s":"","m":""},{"q":"What are your actions if the vessel runs aground?","s":"","m":""},{"q":"Describe the Scharnow Turn. When would it be used instead of the Williamson Turn?","s":"","m":""},{"q":"How would you prepare the vessel for helicopter operations during a medevac?","s":"","m":""},{"q":"What is the purpose of IAMSAR Volume III? What information does it contain for the master of a merchant vessel?","s":"","m":""},{"q":"What emergency towing arrangements should be available on your vessel? How do you operate the aft emergency towing system?","s":"","m":""},{"q":"A red parachute flare is sighted 120 nautical miles from shore. What are your actions?","s":"","m":""},{"q":"You are asked to be On-Scene Commander and proceed to a SART position. What are your actions?"},{"q":"You arrive at the SART location and nobody is there. What search patterns would you use? Which pattern is best?"},{"q":"A man is reported missing from the vessel. What are your actions?"},{"q":"You see 12 consecutive dots on radar. What is this? What actions do you take? What will you see when you are 1 nautical mile away?"},{"q":"What two publications would you refer to when involved in SAR operations?"},{"q":"You are asked to prepare the dedicated rescue boat for an emergency. What checks and preparations would you make?"},{"q":"You observe a rocket parachute flare while on watch with a coast 10nm on your starboard side. What is your first action?"}],"Fire Safety & Fire Fighting":[{"q":"A fire detector is activated on the bridge fire panel. How long do you have to respond before the fire alarm sounds automatically?","s":"","m":"","tip":"Know the exact timing for your vessel type — typically 2 minutes on the fire panel before auto-alarm. Examiners want a specific number, not a vague answer."},{"q":"There is a confirmed fire near the galley. What are your actions from the bridge?","s":"","m":"","tip":"One examiner pushed hard for candidates to mention getting the FIRE PLANS out. Also mention isolating FIRE DAMPERS — one candidate got stuck here and the examiner made sure they said it."},{"q":"Explain the LEL (Lower Explosive Limit) and UEL (Upper Explosive Limit). What is the flammability range?","s":"","m":""},{"q":"You are OOW and a fire alarm sounds from a cabin/galley. What are your actions?","s":"","m":""},{"q":"A smoke alarm has gone off. As OOW, what would you do step by step?","s":"","m":""},{"q":"What is the International Shore Connection? What is its purpose, and what else would you find with it?","s":"","m":"","tip":"Examiners want you to explain the full chain: shore fire parties connect via ISC → supplies water to ship's fire main → allows firefighting even if ship's fire pumps are out of action. Also mention: fire control plan holder, crew list, and muster list should be nearby."},{"q":"What information is contained in the fire control plan? Where is it located?","s":"","m":""},{"q":"How do you identify which fire extinguisher to use for different types of fire? What daily and weekly checks are carried out?","s":"","m":""},{"q":"The fire control panel activates — how long do you have to respond?","s":"","m":""},{"q":"An AB reports a confirmed fire. What are your initial and follow-up actions?","s":"","m":""},{"q":"The security watchman reports smoke in the galley. What are your actions?","s":"","m":""},{"q":"You are 10 miles from land. The Chief Engineer calls to report a burst fuel pipe in the engine room with a major fire. You also have alarms on the bridge panel. What are your actions?","s":"","m":""},{"q":"There is a fire on the engine room bottom platform. How would you deal with it? How would you know the fire is extinguished? When can you re-enter after using the fixed CO₂ system?","s":"","m":""},{"q":"Explain the FIRE principle: Find, Inform, Restrict, Extinguish.","s":"","m":""},{"q":"You have departed port and notice the fire panel on the bridge is blinking. What are your actions as OOW?","s":"","m":"","tip":"Send AB to investigate first — don't leave the bridge unmanned. If confirmed fire: sound alarm, call master, muster crew, boundary cooling, prepare firefighting. One examiner specifically wanted to hear about isolating fire dampers."},{"q":"What fire-fighting equipment was on your last vessel?","s":"","m":""},{"q":"How does a fixed low-expansion deck foam system work? What type of foam is used?","s":"","m":""},{"q":"What safety equipment or LSA would you expect to find in your cabin?","s":"","m":""},{"q":"How often should fire pumps be tested?","s":"","m":""},{"q":"What is the fixed fire-fighting system in the engine room on your last ship? How does it work?","s":"","m":""},{"q":"A manual call point has been activated. What are your actions as OOW?","s":"","m":""},{"q":"How do you prevent a fire? What are the elements of the fire triangle?","s":"","m":""},{"q":"Why do car carriers have fixed fire-fighting systems?","s":"","m":""},{"q":"What is the purpose of a fire and safety plan? Why are crew lists kept alongside it?","s":"","m":""},{"q":"Explain boundary cooling. When and why is it used?","s":"","m":""},{"q":"What are the most likely sources of fire in a galley?"},{"q":"What class of fire would you expect in a galley?"},{"q":"Which type of fire extinguisher would be used for a galley fire?"},{"q":"During a fire emergency, what would the Master be busy with?"},{"q":"The Bosun reports smoke from the paint locker. What are your actions?"},{"q":"You see a fire in an AB's cabin. What are your actions?"},{"q":"What is an EEBD (Emergency Escape Breathing Device)? Where is it located and how long does it last?"},{"q":"How would you check and test a set of breathing apparatus (BA/SCBA)?"},{"q":"How would you inspect a fireman's outfit?"},{"q":"What checks would you carry out on a portable fire extinguisher (e.g. DCP)?"},{"q":"How many fire pumps should be on board? Where are they located?"},{"q":"What is a fire damper? Why is it important to isolate fire dampers during a fire?"},{"q":"Multiple fire detector heads are activated on the bridge panel simultaneously. What are your actions?"},{"q":"Fire in an accommodation space — what are your actions?"}],"GMDSS & Communications":[{"q":"Why should a DSC distress alert not be acknowledged by another vessel?","s":"","m":"","tip":"OOW cannot acknowledge — only the MRCC/coast station should acknowledge a DSC alert. If you acknowledge, the MRCC may think the situation is being handled. Your action is to listen and stand by."},{"q":"What equipment would you use to send a distress message?","s":"","m":""},{"q":"How would you set up NAVTEX? What messages are compulsory?","s":"","m":""},{"q":"What is an EPIRB? How do you activate it? What frequency does it transmit on? Where would you place it if in a liferaft?","s":"","m":"","tip":"When in a liferaft, place the EPIRB on the mounting pole (same pole used for SART). One candidate couldn't remember the name of this pole and lost marks."},{"q":"Tell me everything about SART — what is it, how does it work, and how do you test it?","s":"","m":""},{"q":"The Master tells you to send a distress call. You are in Sea Area A1. How would you proceed?","s":"","m":""},{"q":"How would you prepare a distress message for a man overboard situation?","s":"","m":""},{"q":"What GMDSS equipment would you expect to have on board?","s":"","m":""},{"q":"What is an EPIRB and how does it function?","s":"","m":""},{"q":"Explain the GMDSS equipment and the daily, weekly, and monthly test requirements.","s":"","m":""},{"q":"How would you send a MAYDAY distress call?","s":"","m":"","tip":"Know the full format by heart. Examiners stop candidates partway through — they want to hear you can rattle it off confidently. Practice the format: MAYDAY x3, THIS IS [vessel] x3, MAYDAY [vessel], MY POSITION IS..., nature of distress, assistance required, persons on board, other info."},{"q":"What volume of ALRS covers NAVTEX? What information does Volume 5 contain?","s":"","m":""},{"q":"How would you send a distress alert on Sea Area A1 equipment?","s":"","m":""},{"q":"What are the monthly checks on GMDSS equipment?","s":"","m":""},{"q":"You receive a distress alert in the mid-Atlantic. What are your actions?","s":"","m":""},{"q":"How would you send a distress call on MF/HF and Inmarsat-C, both designated and undesignated?","s":"","m":""},{"q":"What other entries must be made in the GMDSS log book?","s":"","m":""},{"q":"How do you set up NAVTEX step by step? What are the message types (A, B, D, L)?","s":"","m":""},{"q":"How often do you test the EPIRB and where do you log the test?","s":"","m":""},{"q":"You receive a GMDSS alarm via Inmarsat-C. What are your actions?","s":"","m":""},{"q":"The distress vessel is 1500 miles away. What are your actions?","s":"","m":""},{"q":"Why can an OOW not acknowledge a DSC distress alert?","s":"","m":""},{"q":"You receive a distress call on VHF. What are your actions?","s":"","m":""},{"q":"What are the recognised distress signals?","s":"","m":""},{"q":"Your NAVTEX is not working. What could be the reasons?","s":"","m":"","tip":"One candidate listed: wrong message letters (not ABDL selected), wrong NAVAREA, wrong station — examiner said no to all. The answer he wanted: could be a hardware issue like the antenna. Cover software AND hardware causes."},{"q":"What would you do if a distress signal (flare) is sighted?","s":"","m":""},{"q":"What is the difference between a SART and an AIS-SART?","s":"","m":""},{"q":"What GMDSS equipment is required for Sea Area A3?"},{"q":"You receive a distress alert on HF DSC. What are your actions?"},{"q":"You receive a distress alert on the frequency 2187.5 kHz in Sea Area A2. What are your actions?"},{"q":"You have accidentally sent a MAYDAY DSC alert. What are your actions?"},{"q":"How would you conduct a routine VHF call? How would you test VHF DSC?"},{"q":"How would you send a designated distress signal for fire in Sea Area A3?"},{"q":"Tell me about Sea Area A1 requirements — what equipment is needed?"},{"q":"What is the difference between a SART and an AIS-SART? Where would each appear?"},{"q":"What NAVTEX messages cannot be rejected/deleted?"}],"ISPS & Ship Security":[{"q":"What is the ISPS Code? Explain everything you know about it.","s":"","m":""},{"q":"What are the three ISPS/MARSEC security levels? Define each one.","s":"","m":""},{"q":"What is Security Level 3 and when is it applied?","s":"","m":""},{"q":"How do you implement ISPS requirements on board your vessel?","s":"","m":""},{"q":"What are the roles of the SSO (Ship Security Officer), CSO (Company Security Officer), and PFSO (Port Facility Security Officer)?","s":"","m":""},{"q":"What certificate is required under the ISPS Code?","s":"","m":""},{"q":"What is a Declaration of Security (DoS) and when is it required?","s":"","m":""},{"q":"Why is a gangway watch required? What does it have to do with the ISPS Code?","s":"","m":""},{"q":"What is contained in the Ship Security Plan (SSP)?","s":"","m":""},{"q":"What actions would you take if the security level is raised from Level 1 to Level 2?","s":"","m":""},{"q":"The Chief Officer orders a search of the ship. What would you expect to be briefed on?","s":"","m":"","tip":"One candidate failed this point. Expect to be briefed on: what you're searching for, search areas, methods of communication, pairs/teams, what to do if found. In one exam the answer was a bomb — treat it as a security matter under SSP."},{"q":"Does a responsible ISPS gangway watchman need any specific training?"},{"q":"How would you conduct a security drill on board?"},{"q":"A crew member walks out of a storeroom and does not respond to you. He has no ID. What are your actions?"},{"q":"After a security incident, what are your next actions? How would you plan a security search?"},{"q":"What alarm is NOT on a muster list that you will become familiar with within 24 hours of joining?"}],"Life Saving Appliances (LSA)":[{"q":"What LSA would you expect to see during your safety familiarisation on a new vessel?","s":"","m":"","tip":"Don't just list equipment. Examiners want you to know WHERE each item is located, how it works, maintenance schedules, and SOLAS requirements for each. This is a gateway question that leads to 10+ follow-ups."},{"q":"You see a red flare on the horizon. What type of flare is it and what are your actions?","s":"","m":"","tip":"Recognised distress signal. Actions: alter course towards, call master, prepare for SAR operations, refer to IAMSAR Vol. III. Examiners follow up with: what publication? — they want to hear IAMSAR."},{"q":"What is a Hydrostatic Release Unit (HRU)? How does it work and what is its lifespan?","s":"","m":"","tip":"Know the markings and expiry date location. Examiners show pictures and ask you to identify the expiry. HRU activates at approximately 4 metres depth. Lifespan is typically 2 years. Know which equipment has HRUs fitted."},{"q":"You arrive on the bridge and your handover officer will be 20 minutes. How will you use this time? What should you read first?","s":"","m":"","tip":"Don't say 'standing orders' first. The examiner specifically corrected a candidate: read the MUSTER LIST first — your emergency duties, manning number, and emergency signals. Standing orders come second."},{"q":"What is on a muster list? On UK-flagged vessels, does the muster list show names or ranks? What else must it include?","s":"","m":"","tip":"UK muster lists use RANKS not names (because crew change frequently). Must also include subsidiary/replacement personnel — if the primary person can't perform their duty, who takes over. Examiners push for this detail."},{"q":"What instructions would you give to the rescue boat team before launching?","s":"","m":""},{"q":"Your ship has Fast Rescue Boats. What additional qualifications are needed to be the coxswain?","s":"","m":""},{"q":"What would you check before a liferaft enters the water?","s":"","m":""},{"q":"What LSA do you have on your vessel? Describe each type.","s":"","m":""},{"q":"What checks should be carried out on LSA — weekly, monthly, and annually?","s":"","m":""},{"q":"The Chief Officer asks you to conduct a lifeboat drill. How would you go about it?","s":"","m":""},{"q":"You sight a red parachute flare 120nm from shore. What are your actions?","s":"","m":""},{"q":"How would you conduct a lifeboat launching drill? Refer to MGN 560.","s":"","m":""},{"q":"Describe the LSA and FFA on your last vessel.","s":"","m":""},{"q":"How would you launch a davit-launched lifeboat for a drill?","s":"","m":"","tip":"Don't forget the BOWSING LINE for aiding embarkation — multiple candidates missed this. Also mention doing a DRY RUN before lowering with crew inside. Know both on-load and off-load release mechanisms."},{"q":"Tell me everything about a Hydrostatic Release Unit (HRU) — how it works, its markings, and its expiry.","s":"","m":""},{"q":"You are shown a lifeboat hook that is not properly connected. What is wrong and what are the risks?","s":"","m":""},{"q":"Explain the liferaft launching procedure, including from the forward position.","s":"","m":""},{"q":"How would you launch a rescue boat using a davit?","s":"","m":""},{"q":"What equipment is inside a lifeboat?","s":"","m":""},{"q":"What is an HRU and which equipment has one fitted?","s":"","m":""},{"q":"How would you launch a davit-launched lifeboat during an abandon ship situation?","s":"","m":""},{"q":"What is the Hydrostatic Release Interlock (HRI)? Does it work during the off-load process?","s":"","m":""},{"q":"If the HRI fails, how would you manually launch the lifeboat?","s":"","m":""},{"q":"Describe the lifeboat launching procedure for a drill. Explain the use of the bowsing line and both on-load and off-load release mechanisms.","s":"","m":"","tip":"One candidate struggled because they forgot to mention the dry run before lowering with crew. The examiner nudged them. Know the full sequence including bowsing lines, painter, and both release types."},{"q":"What general things are you looking for during safety familiarisation regarding LSA, FFA, and the muster list?","s":"","m":"","tip":"Examiners want in-depth knowledge of the muster list contents specifically — not just a general overview. Spend time on: emergency duties, signals, actions, replacement personnel."},{"q":"Why is a forward liferaft required? How would you board it?","s":"","m":""},{"q":"Identify an HRU, explain its markings, and describe how to check its expiry date.","s":"","m":""},{"q":"What LSA should be located near the gangway?","s":"","m":""},{"q":"How is a liferaft secured on board? What equipment is attached to it?","s":"","m":""},{"q":"What are the contents of a muster list?","s":"","m":""},{"q":"Why are there no names on the muster list — only ranks — on UK vessels?","s":"","m":"","tip":"Because crew change frequently. If names were used, the muster list would need updating constantly. Ranks remain consistent regardless of personnel changes."},{"q":"What checks would you carry out before lowering the rescue boat?","s":"","m":""},{"q":"What monthly checks would you do on a liferaft?","s":"","m":""},{"q":"How would you lower a davit-launched liferaft? Explain in detail.","s":"","m":""},{"q":"The Master asks you to launch the lifeboat as a drill for new crew. How would you proceed?","s":"","m":""},{"q":"When launching a lifeboat for a drill, how many persons should be in the boat?","s":"","m":""},{"q":"What checks should be made on the free-fall lifeboat? What checks and how often?","s":"","m":""},{"q":"A helicopter is approaching for a rescue. What signals and equipment do you need?","s":"","m":""},{"q":"What are the lifeboat inventory check requirements? What happens if items are expired?","s":"","m":""},{"q":"Describe the ship's preparations for an LSA survey.","s":"","m":""},{"q":"What is a Marine Evacuation System (MES)? How does it work?"},{"q":"How many pyrotechnics are required inside a lifeboat?"},{"q":"What are the launching requirements for an enclosed lifeboat vs a free-fall lifeboat?"},{"q":"You are shown a liferaft — what is wrong with it? Identify the fault."},{"q":"Show me where the painter line connects on the HRU."},{"q":"What can you tell me about the hydrostatic interlock system on lifeboats? What if it fails to operate when waterborne?"},{"q":"How would you inspect a liferaft? What checks do you carry out?"},{"q":"What is the minimum number of lifebuoys required for a vessel over 10,000 GT?"},{"q":"How do you protect passengers in an emergency?","s":"","m":"","tip":"Topic 3.1b from MIN 653. Think muster lists, PA announcements, crew duties, assembly stations, MSN 1579."},{"q":"What is a SOLAS Training Manual? What is contained within it and where would you find them?","s":"","m":""},{"q":"How would you prepare the rescue boat for a drill or man overboard situation?","s":"","m":""}],"Lights, Shapes & Buoyage":[{"q":"The anchor ball is displayed while alongside. The anchor chain is up and down. Why is the ball shown?","s":"","m":"","tip":"This tripped up a candidate badly. The answer: to warn other vessels not to drop their anchor on top of yours when berthing. The examiner got annoyed when the candidate kept saying 'to prevent fouling' — he wanted the specific reason about other vessels' anchoring."},{"q":"You are heading North with a West Cardinal on port and an East Cardinal on starboard. What does this indicate and what are your actions?","s":"","m":""},{"q":"Identify a Region B starboard-hand lateral mark and a Region A preferred channel to starboard mark. Describe their light characteristics.","s":"","m":""},{"q":"You need to change a masthead light. What precautions and PPE are required?","s":"","m":""},{"q":"You are heading 090° and see a North Cardinal mark. What are your actions?","s":"","m":""},{"q":"You are heading 180° and see a West Cardinal mark. What are your actions?","s":"","m":""},{"q":"What is reserve buoyancy?","s":"","m":""},{"q":"Describe the light characteristics, rhythm, and top marks of all four cardinal buoys.","s":"","m":""},{"q":"How many IALA regions are there? What are the differences between them?","s":"","m":""},{"q":"You see a long flashing white light for 10 seconds. What does it indicate?","s":"","m":""},{"q":"Why do we use lateral marks?","s":"","m":""},{"q":"What is the purpose of cardinal marks?","s":"","m":""},{"q":"What is the minimum vertical distance between the forward and aft masthead lights?","s":"","m":""},{"q":"You are heading 000° and see a South Cardinal mark. What are your actions?","s":"","m":""},{"q":"A West Cardinal and East Cardinal are dead ahead. What does this mean and what are your actions?","s":"","m":""},{"q":"Explain luminous range, nominal range, and geographical range.","s":"","m":""},{"q":"You see a special mark buoy. What is its colour and light rhythm?","s":"","m":""},{"q":"Shown a light characteristic — identify what type of buoy/mark it belongs to.","s":"","m":""},{"q":"You are shown an East Cardinal on port side and West Cardinal on starboard side, heading North. What are your actions?","s":"","m":""},{"q":"North Cardinal mark shown. You are heading East. What are your actions?","s":"","m":""},{"q":"West Cardinal mark shown. You are heading South. What are your actions?","s":"","m":""},{"q":"Identify a buoy without a topmark — what type is it, which side do you pass, and what are its light characteristics?","s":"","m":""},{"q":"What is an Isolated Danger mark? Describe its appearance, top mark, and light rhythm.","s":"","m":""},{"q":"What is a Safe Water mark? Describe its appearance and light rhythm.","s":"","m":""},{"q":"Identify the navigation lights for: a vessel CBD over 50m, a vessel aground, a vessel NUC under 50m (stern view), and a towing vessel with tow over 200m.","s":"","m":""},{"q":"What is the arc of visibility for masthead lights, sidelights, stern lights, and towing lights?","s":"","m":""},{"q":"If a buoy has no topmark or is out of position, what would you do? Who would you report it to?","s":"","m":"","tip":"Report via Hydrographic Note for inclusion in Notices to Mariners. The examiner specifically wanted to hear 'hydrographic note' and 'NtM' — not just 'report to the coastguard'."},{"q":"What is an emergency wreck marking buoy? Where would you find information about it?","s":"","m":""},{"q":"Going East, you see an East Cardinal mark. What are your actions?"},{"q":"A preferred channel to starboard mark (IALA B) — you are inbound. What are your actions?"},{"q":"Explain the light characteristics and sector of a lighthouse shown on a chart. What do the numbers in brackets mean?"},{"q":"What does it mean if you see a red light from a lighthouse?"},{"q":"What is a special mark buoy? What does CROFTS stand for?"},{"q":"A VEIF (vessel engaged in fishing) with outlying gear — identify the vessel and describe the day shapes and lights."},{"q":"An emergency wreck marking buoy — describe the light characteristics and how you would find more information."},{"q":"Identify a stockless anchor from an image. Describe its components."}],"MARPOL & Pollution Prevention":[{"q":"The cook wants to throw garbage overboard. What questions would you ask and what would you record in the Garbage Record Book?","s":"","m":"","tip":"One candidate said everything correctly but forgot to mention the DATE in the Garbage Record Book. Cover all entries: date, position, category, estimated amount, disposal method."},{"q":"Explain MARPOL Annex VI in your own words, with an example.","s":"","m":"","tip":"Examiners want you to explain it conversationally, not recite regulations. Give a practical example — e.g. switching to low-sulphur fuel when entering an ECA, or the NOx tier requirements for engines."},{"q":"What is the Ballast Water Record Book for?","s":"","m":""},{"q":"What should be done if the galley crew want to dispose of garbage at sea?","s":"","m":""},{"q":"What is a Special Area under MARPOL? Name some Special Areas.","s":"","m":""},{"q":"The Bosun informs you the garbage contains paint waste and rags. What are the disposal requirements?","s":"","m":""},{"q":"What precautions must be taken during bunkering operations?","s":"","m":""},{"q":"How do you maintain the Garbage Record Book on board?","s":"","m":""},{"q":"Can garbage be thrown overboard? Under what MARPOL regulations?","s":"","m":""},{"q":"What are the specific precautions during a Ship-to-Ship (STS) transfer operation?","s":"","m":""},{"q":"Name all six MARPOL Annexes and briefly describe what each covers.","s":"","m":""},{"q":"You are in the Straits of Gibraltar. The Chief Engineer wants to discharge oily water from the bilges. What are the requirements?","s":"","m":""},{"q":"What is the Oily Water Separator (OWS)? What is the maximum oil content for discharge?","s":"","m":""},{"q":"What are the discharge requirements for food waste, cargo residues, and operational waste under MARPOL Annex V?","s":"","m":""},{"q":"What is SOPEP? What equipment should be included in the SOPEP locker?","s":"","m":""},{"q":"The Chief Engineer wants to discharge machinery space bilges while on passage in the Atlantic. What would you advise?"},{"q":"What are the MARPOL Annex V garbage categories? How many are there?"},{"q":"What are the bunkering operation precautions? What SOPEP equipment should be at the bunker manifold?"},{"q":"How did MARPOL affect your last ship and which annexes applied?","s":"","m":"","tip":"Be specific to YOUR last vessel type. Examiners want a practical, personal answer."}],"Meteorology & Weather":[{"q":"Describe a barometer and a hygrometer. What are they used for?","s":"","m":""},{"q":"Where would you find weather information on board?","s":"","m":""},{"q":"How do you calculate the dew point? How does this help predict fog?","s":"","m":""},{"q":"What weather would you expect at sea during heavy weather? What precautions would you take?","s":"","m":""},{"q":"What weather conditions would you expect at a cold front?","s":"","m":"","tip":"After cold front questions, examiners often follow up with visibility specifically. At a cold front: heavy rain/showers, sudden wind shift, good visibility after passage but poor during."},{"q":"What are the signs of an approaching Tropical Revolving Storm (TRS)?","s":"","m":""},{"q":"How would you determine which semicircle of a TRS you are in?","s":"","m":""},{"q":"How would you determine the range of visibility?","s":"","m":""},{"q":"What are the sources of weather information available to a vessel?","s":"","m":""},{"q":"What is a depression? How does it form?","s":"","m":""},{"q":"What kind of weather do you expect when a cold front is approaching? What about the visibility?","s":"","m":""},{"q":"In the Northern Hemisphere, in which direction do anticyclones and depressions rotate?","s":"","m":""},{"q":"On watch, the atmospheric pressure drops significantly. What could this indicate and what are your actions?","s":"","m":""},{"q":"What is a barograph? What is it used for?","s":"","m":""},{"q":"What is a Stevenson screen/hygrometer? How do you use it to determine relative humidity and dew point?","s":"","m":"","tip":"Examiners connect this to BOTH weather AND cargo. After explaining wet/dry bulb, they want you to link dew point to fog prediction AND cargo sweat prediction. Use Mariner's Handbook tables."},{"q":"How do you take a reading from a barometer? What corrections must be applied?","s":"","m":""},{"q":"What meteorological instruments would you expect on the bridge?","s":"","m":""},{"q":"Why is it necessary to gently tap a barometer before reading?","s":"","m":""},{"q":"What corrections are applied to a barometer reading?","s":"","m":""},{"q":"You are shown a synoptic chart near a tropical cyclone. What are your actions?","s":"","m":""},{"q":"How would you receive local weather information while at sea?","s":"","m":""},{"q":"What is Mason's hygrometer? How would you use it to predict fog?","s":"","m":""},{"q":"What should you do before entering fog? What COLREG rules would apply?","s":"","m":""},{"q":"Which direction does wind rotate around a low-pressure system and a high-pressure system in the Northern Hemisphere?","s":"","m":""},{"q":"Explain Buys Ballot's Law. How is it used?","s":"","m":""},{"q":"A frontal depression is approaching. Who would you inform and in what order?","s":"","m":"","tip":"Surprising answer: one examiner wanted the GALLEY first — so they can secure equipment before heavy weather arrives. Most candidates listed master, engine room, etc. and missed the galley."},{"q":"Identify the features on a synoptic chart — cold front, warm front, occluded front, and non-frontal trough.","s":"","m":""},{"q":"How do you calculate wind speed from a synoptic chart using isobars?","s":"","m":"","tip":"Know the geostrophic wind calculation. One examiner followed up: 'you're up river — how would you adapt?' Answer: reduce significantly (much less than the 2/3 rule) due to buildings, trees, and hills as obstructions."},{"q":"What weather instruments are available on the bridge and what is each used for?","s":"","m":""},{"q":"A barometric pressure of 1010mb drops by 4mb. What are your concerns?"},{"q":"What would you do on the bridge in response to a TRS warning?"},{"q":"How do you broadcast a safety message regarding weather? Which publication tells you to do so?"},{"q":"Why do you need to correct barometric pressure to sea level?"},{"q":"You are outbound from Liverpool heading south in the Irish Sea. Describe the expected weather from the synoptic chart shown."},{"q":"What are some of the approved meteorological equipment carried on board?"},{"q":"While still alongside, an Atlantic Low is approaching. What preparations would you make?"},{"q":"What is the latest method to obtain weather forecast information when sailing near the coast?"},{"q":"Heavy rain starts during your watch. What could this signify in terms of visibility and weather changes?"},{"q":"What is considered restricted visibility? At what point do you class conditions as restricted visibility?"}],"Navigation & Passage Planning":[{"q":"During pilotage, the steering becomes sluggish. What could be the cause?","s":"","m":"","tip":"The answer is SQUAT. The examiner used the word 'sluggish' deliberately. Also know: how to reduce squat (reduce speed), and other shallow water effects (bank effect, interaction)."},{"q":"Explain the appraisal stage of passage planning. What publications and documents would you use?","s":"","m":""},{"q":"You are shown a chart symbol — identify it and explain its meaning.","s":"","m":""},{"q":"The Master asks you to plan a passage from Chania to Singapore. How would you go about this?","s":"","m":""},{"q":"How would you draw a free-hand route as required by sailing directions?","s":"","m":""},{"q":"What methods can you use to check that the vessel is maintaining the planned course?","s":"","m":""},{"q":"You mentioned UKC in the appraisal stage. How would you determine the required under-keel clearance?","s":"","m":""},{"q":"What are the methods of position fixing in coastal waters?","s":"","m":"","tip":"Don't forget the ECHO SOUNDER. One examiner kept asking 'what else? what else?' and the candidate listed every visual method but missed echo sounder. Also mention: visual bearings, radar ranges/bearings, transit bearings, GPS cross-check."},{"q":"What types of shallow-water interaction can a vessel experience, other than squat?","s":"","m":""},{"q":"What is a routing chart? How many are there and what information do they contain?","s":"","m":""},{"q":"What is great circle sailing? What is the definition of a great circle?","s":"","m":""},{"q":"What can you use on radar to help with position fixing?","s":"","m":""},{"q":"What are parallel index (PI) lines and how are they used?","s":"","m":""},{"q":"What is under-keel clearance (UKC)? How do you monitor it?","s":"","m":""},{"q":"You are planning a passage from Mumbai to Antwerp. How would you proceed?","s":"","m":""},{"q":"How would you plan your passage on ECDIS from a chart?","s":"","m":""},{"q":"What specifics from charterer instructions would you consider for passage planning?","s":"","m":""},{"q":"The Chief Officer gives you the final draft. How would you use this information in ECDIS?","s":"","m":""},{"q":"Explain all four stages of passage planning (APEM) and the publications you would use.","s":"","m":"","tip":"The most common exam topic overall (54+ mentions). Examiners often stop you partway through Appraisal and drill into publications. Know routing charts, NP136, Mariner's Handbook, sailing directions, tide tables, NtMs — and what specific info each provides."},{"q":"What is Ocean Passages for the World (NP136)? What information does it contain?","s":"","m":""},{"q":"What is a tide table and what information does it provide?","s":"","m":""},{"q":"Why should the passage plan be shared with the engine department? Why should the Chief Engineer know about it?","s":"","m":""},{"q":"Where are nautical publications kept on the bridge?","s":"","m":""},{"q":"What are the sections and contents of Notices to Mariners (NtM)?","s":"","m":""},{"q":"Explain parallel indexing and echo referencing on radar/ECDIS.","s":"","m":""},{"q":"Describe the procedure for chart and nautical publication corrections.","s":"","m":""},{"q":"The helmsman reports sluggish steering. What could this be? What is squat and how can it be reduced?","s":"","m":""},{"q":"What type of sailing would you use for an ocean passage — great circle or rhumb line? What factors would you consider?","s":"","m":""},{"q":"Where do you get information about tidal diamonds? How do you read a tidal diamond table?","s":"","m":""},{"q":"Why are there two columns for rates in a tidal diamond table?","s":"","m":""},{"q":"What happens when a ship enters shallow water or the deep contour area?","s":"","m":""},{"q":"The Master asks you to prepare a passage plan from Immingham to Richards Bay. Walk me through all four stages.","s":"","m":""},{"q":"What is a transit bearing and what can you use it for?","s":"","m":""},{"q":"Given a transit bearing, compass bearing, and variation — calculate the deviation and compass error.","s":"","m":""},{"q":"If a buoy has no topmark or is out of position, what would you do and who would you report it to?","s":"","m":""},{"q":"How would you update paper charts?","s":"","m":""},{"q":"You are planning a passage from Rotterdam to New York. How would you go about this?","s":"","m":""},{"q":"What are the pros and cons of great circle sailing?","s":"","m":"","tip":"Pros: shortest distance. Cons: constantly changing course, may pass through high latitudes (ice, weather, poor comms). Examiners follow up with limiting latitudes and composite great circle — be ready."},{"q":"How would you plan a passage? Speak briefly about each stage of APEM.","s":"","m":""},{"q":"What publications would you use for passage planning?","s":"","m":""},{"q":"What is the difference between a synoptic chart and a forecast chart?","s":"","m":""},{"q":"How would you use a tidal diamond?","s":"","m":""},{"q":"What would you expect the vessel to experience moving from deep water into shallow water?","s":"","m":"","tip":"Squat effect — but also: bodily sinkage, change in trim, reduced rudder response, bank suction/cushion effect. Don't just say 'squat' and stop."},{"q":"Explain the difference between a great circle sailing and a rhumb line.","s":"","m":""},{"q":"What is a limiting latitude? Why might one be put in place?","s":"","m":""},{"q":"Where would you find company policies regarding limiting latitudes?","s":"","m":""},{"q":"How do you read draught marks on a ship? How do you find the mean draught?","s":"","m":""},{"q":"Why do we calculate the ship's draught?","s":"","m":""},{"q":"If the accommodation ladder angle increases due to a change in draught, is it still safe to use?","s":"","m":""},{"q":"How would you identify cold and warm fronts on a synoptic chart?","s":"","m":""},{"q":"During a passage from Southampton to New York, what kind of weather would you expect?","s":"","m":""},{"q":"What does it mean when isobars are closely spaced on a chart?","s":"","m":""},{"q":"Can you determine current set and drift using true vector mode on radar?","s":"","m":""},{"q":"What is a CBD (Constrained by Draught) vessel? Why is it important in passage planning?","s":"","m":""},{"q":"How would you plan a passage from Southampton to South Africa? What publications would you have readily available?","s":"","m":""},{"q":"What factors could affect a change in draft?","s":"","m":""},{"q":"What publication discusses rescue operations at sea?","s":"","m":"","tip":"IAMSAR Volume III. This comes up 9+ times. Know it exists, what it contains, and that it provides guidance for the master of a merchant vessel during SAR operations."},{"q":"What is the common safety checklist on an oil tanker called, and in what publication would you find it?","s":"","m":""},{"q":"Which type of sailing would you use for a passage from Europe to Brazil? Explain composite great circle sailing and limiting latitudes.","s":"","m":""},{"q":"What information is found on routing charts?","s":"","m":""},{"q":"What are the pre-departure checks you would carry out on the bridge?","s":"","m":""},{"q":"What is squat? How do you identify it and reduce it?","s":"","m":"","tip":"Squat appears 25+ times in reports. Know: it's the bodily sinkage and change in trim in shallow water. Identified by sluggish steering. Reduced by reducing speed. Be ready for follow-up: other shallow water effects, bank effect."},{"q":"How many types of gyro course error are there? Explain them.","s":"","m":""},{"q":"On paper charts, do you get luminous range, nominal range, or geographical range?","s":"","m":""},{"q":"What information is contained in chart survey data?","s":"","m":""},{"q":"Passage planning from Brazil to Europe — walk me through it.","s":"","m":""},{"q":"What information is in a tidal stream atlas?","s":"","m":""},{"q":"What are the considerations for a great circle route and reasons for using limiting latitudes?","s":"","m":""},{"q":"What are the primary and secondary methods of position fixing in the open ocean?","s":"","m":""},{"q":"What publications are required to be carried on board?","s":"","m":""},{"q":"How would you conduct a passage plan from Canada to Ireland in September?","s":"","m":""},{"q":"What are the contents of a routing chart?","s":"","m":""},{"q":"How do you monitor the passage plan during execution?","s":"","m":""},{"q":"How do you know if the vessel is deviating from its planned course?","s":"","m":""},{"q":"What is a leading line? Explain everything about it.","s":"","m":""},{"q":"What are the black curved lines on a chart? What information do they provide?","s":"","m":""},{"q":"What publications relate to weather for passage planning?","s":"","m":""},{"q":"What documents would you hand over to the Master when joining? What are the advanced STCW courses?","s":"","m":"","tip":"List ALL advanced courses. One examiner kept probing and the candidate couldn't name PSCRB (Proficiency in Survival Craft and Rescue Boats) — it's the one most people forget. Also don't forget GoC."},{"q":"How would you know if a paper chart is acceptable to use and corrected to the latest edition?","s":"","m":"","tip":"Check current edition number and cumulative NtMs to confirm it's corrected to the current week. Examiners want to hear 'corrected to the latest NtM week number'."},{"q":"The Master asks you to plan a passage from Southampton to Singapore on a container ship. How would you proceed?","s":"","m":""},{"q":"What is a gnomonic chart? How do you use it to plot a great circle route and transfer it to a Mercator chart?","s":"","m":""},{"q":"What are the problems and considerations with great circle sailing?","s":"","m":""},{"q":"What publication covers health and safety for UK-flagged vessels?","s":"","m":""},{"q":"What publication provides SAR guidance?","s":"","m":""},{"q":"What equipment would you take in an abandon ship situation?","s":"","m":""},{"q":"How would you navigate your vessel during a coastal passage? What techniques would you use?"},{"q":"What is the best way to fix the vessel's position during a coastal passage?"},{"q":"Why do you only use the true course of your vessel when plotting parallel index lines?"},{"q":"How would you make paper chart corrections using a weekly Notices to Mariners?"},{"q":"How would you transfer a passage plan from paper charts to ECDIS?"},{"q":"During an ECDIS route check, a Category A alarm is triggered. What does this mean and what are your actions?"},{"q":"How would you join a TSS halfway through the lane rather than at the termination point?"},{"q":"What type of chart projection is a gnomonic chart? Is it the same as a Mercator? Explain the differences."},{"q":"What are wind roses on a routing chart? Explain how to read them."},{"q":"How would you check if paper charts are corrected to the latest edition? Which volume of cumulative NtMs would you use?"},{"q":"What is CATZOC on ECDIS? What does it tell you about chart data quality?"},{"q":"What is the presentation library on ECDIS?"},{"q":"What are drying heights on a chart? How do you identify them?"},{"q":"Two vessels are passing each other in a narrow channel. What interaction effects could occur and how would you correct them?"},{"q":"What is wire drag depth on a chart? What does it mean?"},{"q":"How can you still take advantage of a great circle route but safeguard yourself from hazards?"},{"q":"A TRS warning comes in on NAVTEX. What would you advise the Master?"},{"q":"How do you get out of the dangerous semicircle in a TRS in the Northern Hemisphere?"},{"q":"Your autopilot alarm goes off during heavy weather. What are your actions? What could be the cause?"},{"q":"What is the Racon signal for an emergency wreck marking buoy?","s":"","m":"","tip":"Morse letter D (dash-dot-dot). Relatively new addition that examiners are increasingly asking about."}],"Radar, ARPA & Plotting":[{"q":"What is a virtual AIS (V-AIS) symbol? What is synthetic AIS? Why does AIS use VHF?","s":"","m":""},{"q":"You are shown a SART on radar. What is it, how does it work, and what pulse length should you use?","s":"","m":""},{"q":"You see 3 dots on the starboard quarter of the radar screen. What are your actions?","s":"","m":""},{"q":"What type of radar did you have on your last ship?","s":"","m":""},{"q":"Which radar band would you use for collision avoidance and which for navigation?","s":"","m":""},{"q":"What is a blind sector on radar and how would you identify it?","s":"","m":""},{"q":"How do you test radar performance? What is the radar performance monitor?","s":"","m":""},{"q":"How can you use radar for position monitoring?","s":"","m":""},{"q":"You are shown a radar screen with multiple targets. What is wrong with the setup?","s":"","m":"","tip":"Common exam scenario: the radar screen shows the ship very near land (12nm range), speed 16kts, AIS off, ARPA off, trails off, no target acquisition. Take your time — the examiner says 'look very carefully.' List everything wrong."},{"q":"You have three plots on the starboard side using a 12-minute plot. What information do you get?","s":"","m":""},{"q":"How do you calculate TCPA from a radar plot?","s":"","m":""},{"q":"How do you determine risk of collision using radar? Does an overtaking situation appear the same on radar as visually?","s":"","m":""},{"q":"A vessel is on the starboard bow — you are given three plots at 12nm range over 12 minutes. Calculate the TCPA, true heading of the target, and your action.","s":"","m":""},{"q":"How would you set up your radars for departure?","s":"","m":"","tip":"One examiner wants very in-depth answers here. Start with: check power to radar, go outside and physically check the scanner is clear, switch on, adjust brilliance, tune, set range, set sea/rain clutter, check heading marker alignment."},{"q":"You see a single blip on the radar screen. What are your actions?","s":"","m":""},{"q":"How would you set up radar from cold? What checks do you carry out?","s":"","m":""},{"q":"What do you know about ARPA? Explain its capabilities and limitations.","s":"","m":""},{"q":"Explain the different radar orientations and display modes.","s":"","m":""},{"q":"Two targets are forward of the beam on the port side. What would you do?","s":"","m":""},{"q":"Six targets on radar — three on port and three on starboard forward of the beam. What are your actions?","s":"","m":""},{"q":"How would you set up radar for departure?","s":"","m":""},{"q":"How would you identify a SART signal on radar? Which radar band displays it?","s":"","m":"","tip":"SART displays as 12 dots on X-band radar (9 GHz). Will NOT display properly on S-band. Know the pulse length setting required. One candidate forgot this and lost marks."},{"q":"How would you know your radar is performing correctly? What is the performance monitor?","s":"","m":""},{"q":"How would you set up radars for collision avoidance?","s":"","m":""},{"q":"Explain a radar plot — a vessel is on the starboard side with one fix. What will you do?","s":"","m":""},{"q":"Two vessels converging with CPA 0.0 on port and starboard shoulders. What would you do?","s":"","m":""},{"q":"What data from GPS is fed into the radar system?","s":"","m":""},{"q":"What are ground-stabilised and sea-stabilised radar modes? When would you use each?","s":"","m":""},{"q":"What are all the factors for safe speed — for all ships and for ships with operational radar?","s":"","m":""},{"q":"What is a trial manoeuvre on radar? How is it used?","s":"","m":""},{"q":"In restricted visibility, a radar blip is bearing 045°. What are your actions?","s":"","m":""},{"q":"What are CPA and TCPA? Without plotting, how would you roughly estimate them?","s":"","m":""},{"q":"You notice a nav light is out during departure checks. What are your actions to replace it safely?","s":"","m":""},{"q":"In restricted visibility, a vessel is detected on your starboard quarter. You plot it — what are your actions?","s":"","m":""},{"q":"An AB reports the fog signal of a vessel apparently forward of the beam, but it is not detected on radar. What are your actions?","s":"","m":"","tip":"Call master. Then state what Rule 19(e) requires. This specific scenario tests whether you know the rule about a vessel detected by hearing alone. Don't assume radar failure — the vessel may be too small or in a blind sector."},{"q":"Where are gyrocompass repeaters located and what are they connected to?","s":"","m":""},{"q":"You are shown three targets on radar — which is critical and why?","s":"","m":""},{"q":"Which target is stationary? Which is on the same course? Which is crossing? Which is on an opposite course?","s":"","m":""},{"q":"You are in fog with zero visibility. One target blip is visible on the PPI. What do you need to determine and what will you do?","s":"","m":""},{"q":"Explain the difference between relative motion and true motion radar displays.","s":"","m":""},{"q":"Two targets are forward of the beam — one on port side, one on starboard side — and risk of collision exists with both. What are your actions?"},{"q":"A target is on your starboard quarter and risk of collision exists. What are your actions under Rule 19?"},{"q":"Three blips appear on the port bow, then three more appear on the starboard bow. What are your actions?"},{"q":"The three port bow blips disappear, and three new blips appear on the starboard quarter. What are your actions?"},{"q":"You are shown a radar plot but not given your own vessel's speed. How does this affect your plotting?"},{"q":"Explain how to use VRM and EBL on radar for navigation and collision avoidance."},{"q":"What are the errors of ARPA? How does the failure of the speed log and gyro affect ARPA?"},{"q":"What is a blind sector and a shadow sector on radar? What is the difference?"},{"q":"Explain the errors of an echo sounder."}],"SOLAS, Conventions & Certificates":[{"q":"What are the main international maritime conventions? How are they incorporated into UK law?","s":"","m":""},{"q":"What certificates must a vessel carry? What are their validity periods and conditions?","s":"","m":""},{"q":"What is the Maritime Labour Convention (MLC)? What does it cover?","s":"","m":""},{"q":"How would you maintain a safe watch on the bridge? Reference MGN 315 and SOLAS Chapter V.","s":"","m":""},{"q":"What STCW certificates would you hand over when joining a vessel?","s":"","m":""},{"q":"You have joined a new ship and been introduced to the Master. What certificates would you show?","s":"","m":"","tip":"One candidate missed the GoC (GMDSS General Operator's Certificate) and was corrected. Have the full list ready: CoC, GoC, ECDIS type-specific, STCW advanced certs, medical (ENG1), passport, discharge book."},{"q":"What certificates and documents must all ships carry?","s":"","m":""},{"q":"What regulations apply to ballast movements and what documents must be filled out?","s":"","m":""},{"q":"What does 'OOW Unlimited' mean on your Certificate of Competency?","s":"","m":""},{"q":"The regulations state the steering gear test should be done within 12 hours before departure. What exactly does this mean?","s":"","m":""},{"q":"What is a Seafarer's Employment Agreement (SEA)? Where does it come from?","s":"","m":""},{"q":"What are the MLC work hours and rest hours requirements?","s":"","m":""},{"q":"Where would you find the regulations for accommodation ladders?","s":"","m":""},{"q":"What is the MLC? What code is related to the SEA?","s":"","m":""},{"q":"Describe the pilot ladder arrangements — regulations, procedures, and your role as OOW.","s":"","m":""},{"q":"What is a SOLAS Training Manual?","s":"","m":""},{"q":"Fire-fighting appliances are covered under which chapter of which international convention?","s":"","m":""},{"q":"What should a company complaint and grievance process look like? What legislation does it link to?","s":"","m":""},{"q":"What certificate should a vessel have for carrying dangerous goods? What does it contain?","s":"","m":""},{"q":"Tell me about MGN 560. What does it cover?","s":"","m":""},{"q":"If the Ballast Water Treatment System malfunctions, what are your actions and what is the associated legislation?","s":"","m":""},{"q":"What are the LOLER regulations and how do they apply on board?","s":"","m":""},{"q":"What is Port State Control (PSC)? What is the purpose of inspections and what should you expect during one?"},{"q":"What is the difference between a non-conformity and a major non-conformity?"},{"q":"Explain what a non-adopted TSS is. Where would you find information about it?"},{"q":"What UK guidance exists on the contents of a Seafarer Employment Agreement?"},{"q":"What is MGN 285 and how does it relate to ECDIS risk assessment?"},{"q":"What are the 13 items that must be mentioned in a Seafarer Employment Agreement?"},{"q":"Explain the difference between a pilot ladder and an embarkation ladder."},{"q":"What does SOLAS stand for and give examples of what the various chapters deal with.","s":"","m":""},{"q":"Explain what STCW is and how it regulates UK flag ships.","s":"","m":""},{"q":"What is the IMO and what are its key Conventions?","s":"","m":""},{"q":"What are the STCW Manila amendments and what did they change?","s":"","m":""},{"q":"How are IMO conventions made mandatory for UK-flagged ships?","s":"","m":"","tip":"Explain the route: Convention > Merchant Shipping Regulations (SIs) > M-Notices."},{"q":"What is a \"passenger\" as defined by SOLAS?","s":"","m":""},{"q":"What is the purpose of the Ballast Water Management Convention and how must ships comply?","s":"","m":""},{"q":"What is Tacit Acceptance and why does the IMO use it?","s":"","m":"","tip":"Amendments enter into force on a set date unless a specified number of states object. Speeds up versus requiring positive acceptance."},{"q":"You are the OOW at 02:30 and receive a distress message about a vessel sinking 50 NM away. What do you do?","s":"","m":""},{"q":"You have exceeded your permitted hours of work. What are your actions?","s":"","m":""},{"q":"In what situations might there be conflict between Flag State and Port State regulations, and whose law prevails?","s":"","m":""},{"q":"What are the respective roles of Flag State and Port State?","s":"","m":""},{"q":"What is the role of the MAIB and its relationship with the MCA?","s":"","m":""},{"q":"A crew member has been killed in an accident on deck. What evidence will be gathered and what investigations carried out?","s":"","m":""},{"q":"The Chief Officer has been seriously injured on board. What are the management issues?","s":"","m":""},{"q":"Port State Control — what are their functions?","s":"","m":""},{"q":"You are OOW when a serious incident occurs. How will you co-operate in the investigation?","s":"","m":""}],"Safety, ISM & SMS":[{"q":"You are dropped off at the quayside by the agent. What do you look for when approaching and joining a new ship?","s":"","m":"","tip":"This is the most common opening question in OOW exams. Cover: vessel condition, name, port of registry, IMO number, draught marks, loadline, mooring arrangement, rat guards, rope condition, gangway (angle, construction, netting, handrails, lighting), safety signs, PPE on crew, hull biofouling."},{"q":"What do you understand about health and safety on board? What are the key regulations (e.g. H&S Regs 1997)?","s":"","m":"","tip":"Don't just say 'COSWP.' One examiner pushed back hard — they want the full name: Merchant Shipping and Fishing Vessels (Health and Safety at Work) Regulations 1997. Know the actual regulation name."},{"q":"What observations would you make when arriving at the quayside before boarding?","s":"","m":""},{"q":"What would you expect to happen after you board the vessel?","s":"","m":""},{"q":"What is ISM and how did you comply with it on your last vessel?","s":"","m":""},{"q":"What is the purpose of an SMS? What does it contain and where does it come from?","s":"","m":""},{"q":"What are your SMS duties upon joining a vessel?","s":"","m":""},{"q":"What things would you check at the gangway before boarding?","s":"","m":""},{"q":"What is included in the conversation with the DPA/Marine Superintendent before joining?","s":"","m":""},{"q":"What do you understand by health and safety on board and the key regulations?","s":"","m":""},{"q":"What is a risk assessment? What is a permit to work? How are they carried out?","s":"","m":"","tip":"For pilot ladder rigging, one examiner specifically wanted to hear about HARNESS for crew working near the ship's side. Always mention PPE specifics relevant to the task."},{"q":"What is the SMS? What are the objectives of the ISM Code and the functional requirements of the SMS?","s":"","m":""},{"q":"Apart from the SMS, what other UK publication covers safe working practices?","s":"","m":""},{"q":"What makes up the Safety Management System?","s":"","m":""},{"q":"Explain the SMS and how it is useful for an OOW.","s":"","m":""},{"q":"You have joined your first vessel, given documents to the Master, and head to the bridge. What do you expect to happen in the first few hours?","s":"","m":""},{"q":"The Chief Officer is busy with cargo. What would you do while waiting and what would you expect next?","s":"","m":""},{"q":"What is COSWP? Explain something about it.","s":"","m":""},{"q":"What is a risk assessment and how do you carry it out on board?","s":"","m":""},{"q":"Where would you find your roles and responsibilities when first getting on board?","s":"","m":""},{"q":"What are the functional requirements of the ISM Code/SMS?","s":"","m":""},{"q":"What certification is issued under the ISM Code? What are the validity and survey requirements?","s":"","m":""},{"q":"Why do you need to close the scuppers? When?","s":"","m":""},{"q":"Which regulation covers UK health and safety on ships?","s":"","m":""},{"q":"What is the role of the Designated Person Ashore (DPA)?","s":"","m":""},{"q":"What is ISM? What is a non-conformity? Give examples.","s":"","m":""},{"q":"How is ISM put into law and implemented on board?","s":"","m":""},{"q":"What are the objectives of the SMS?","s":"","m":""},{"q":"What regulations or codes discuss safety management and pollution prevention?","s":"","m":""},{"q":"What is the SMS and who does the ISM Code apply to?","s":"","m":""},{"q":"What certificates are required by a company and vessel under the ISM Code?","s":"","m":""},{"q":"What are the audit/survey requirements for ISM certificates (internal and external)?","s":"","m":""},{"q":"The Master asks you to complete a risk assessment for an operation. How would you do it and what preventive measures would you implement?","s":"","m":""},{"q":"What are the dangers of enclosed space entry? What are the preparations, ventilation procedures, and atmospheric testing requirements?","s":"","m":"","tip":"Test for: oxygen (>20.9%), hydrocarbons (<1% LEL), toxic gases (H₂S, CO). Know the equipment: multi-gas detector. Ventilation must be continuous. Rescue team standing by at entrance. This topic appeared 24+ times across reports."},{"q":"What equipment should be at the entrance to an enclosed space? What do you test for in the atmosphere and what do you use?","s":"","m":""},{"q":"Talk me through a near-miss reporting procedure. Who gets informed?"},{"q":"What is the role of the Safety Officer on board?"},{"q":"What documents would you expect to accompany an enclosed space entry?"},{"q":"Where would you find a list of enclosed spaces on your vessel?"},{"q":"What should be done before releasing CO₂ in the engine room? What important things must you keep in mind?"},{"q":"What is a Planned Maintenance System (PMS)? How does it relate to the SMS?"},{"q":"The Chief Officer asks you to do extra hours and says he will compensate the next day. What are the MLC rules on this?"},{"q":"You see the Chief Officer checking the draught and dock water density. What might this be for?"},{"q":"What instrument would you use to check the density of water?"},{"q":"How would you conduct a toolbox talk with the crew before an operation?"},{"q":"What is the Health and Safety at Work Act 1974 and how does MGN 636 apply it to ships?","s":"","m":""},{"q":"What is COSWP and what information would you expect to find in it?","s":"","m":"","tip":"COSWP is a Code, NOT regulations. It references SIs like Lifting Operations Regs 2006 and PPE Regs 1999."},{"q":"What records exist on board ship for safety tours?","s":"","m":""},{"q":"What special actions must be taken to protect the health and safety of under-18s on board ship?","s":"","m":""},{"q":"You are going forward to anchor with a 17-year-old trainee. What are your considerations?","s":"","m":"","tip":"Under-18 risk assessment required. Consider noise, working hours limits, supervision, and specific hazards of anchoring."},{"q":"Contrast the roles of the MAIB and the HSE.","s":"","m":""},{"q":"What is the principal legislation for health and safety law and how is it applied in marine operations?","s":"","m":""},{"q":"What type of information is contained in the SMS?","s":"","m":""},{"q":"What are the duties of the DPA? What are the duties of the Safety Officer?","s":"","m":"","tip":"DPA is the link between company and ship under ISM. Safety Officer is on-board safety champion — different functions."},{"q":"Explain the differences and relationships between the ISM Code and the ISPS Code.","s":"","m":""},{"q":"How does the Maritime Labour Convention affect the protection of seafarers' health and safety?","s":"","m":""},{"q":"What is the SEA and what part does it play in the Master's Overriding Duty?","s":"","m":""},{"q":"Other than certification, how would a shipowner be held to account to comply with the MLC?","s":"","m":""},{"q":"How would you manage stress on board?","s":"","m":""}],"Ship Construction & Stability":[{"q":"What are loadline zones? Name them and explain their significance.","s":"","m":""},{"q":"What is the stability of a vessel? Explain the basic principles.","s":"","m":""},{"q":"How do you check the condition of hatch covers? What about the rubber seals? What damages them? What regulations do hatch covers come under?","s":"","m":"","tip":"Regulations: Load Line Convention. Examiner asked specifically about the rubber — UV damage, cargo damage, compression. Know how hatch covers work mechanically and what 'weathertight' means vs 'watertight'."},{"q":"The vessel develops a list during cargo operations. What could be the cause and what would your actions be?","s":"","m":"","tip":"One candidate FAILED because they didn't mention sounding the General Emergency Alarm when the list continued to increase. Stop cargo, stop ballasting, call Master — but if it keeps going, sound the GEA."},{"q":"What precautions are in place to ensure the safe stability of the vessel?","s":"","m":""},{"q":"What is a stiff vessel and a tender vessel? Explain the difference and the dangers of each.","s":"","m":"","tip":"Stiff = high GM, short sharp roll, dangerous to crew and cargo. Tender = low GM, slow lazy roll, risk of capsizing. Know which is corrected by adding/removing ballast. This comes up in 17+ reports."},{"q":"Explain loadlines and their survey requirements.","s":"","m":""},{"q":"The vessel heels while loading cargo. What are your actions?","s":"","m":"","tip":"One candidate FAILED because they didn't mention sounding the General Emergency Alarm when the list continued to increase. Stop cargo, stop ballasting, call Master — but if it keeps going, sound the GEA."},{"q":"You are loading steel coils and the vessel suddenly heels 10 degrees. What does this mean and how would you correct it?","s":"","m":""},{"q":"You are loading coal and the vessel begins listing heavily. What will you do?","s":"","m":""},{"q":"What is the Load Line Convention? What do the markings next to the Plimsoll mark signify?","s":"","m":""},{"q":"After loading steel coils, what will be the effect on the ship's stability?","s":"","m":""},{"q":"If the GM of the ship increases, what effect does this have? Why can an excessively stiff vessel be dangerous?","s":"","m":""},{"q":"What forces and stresses may the vessel experience during cargo operations?","s":"","m":""},{"q":"What is free surface effect? How does it affect stability?","s":"","m":""},{"q":"What is the difference between list and loll? How do you correct each?","s":"","m":""},{"q":"Why is GM so important for vessel stability?","s":"","m":""},{"q":"How would you ensure the vessel's stability during discharge operations?","s":"","m":""},{"q":"Where do you find the minimum stability operational requirements for the vessel?","s":"","m":""},{"q":"You are on watch and the inclinometer shows the ship is listing. What are your actions?","s":"","m":""},{"q":"What is the importance of ballasting operations? Explain bending moments, hogging, sagging, and shearing forces.","s":"","m":""},{"q":"Define shear force and bending stress. How do they develop in a ship's hull?","s":"","m":""},{"q":"What are the stability considerations specific to a RoRo vessel?","s":"","m":""},{"q":"What is the CAN test used for in relation to bulk cargoes?","s":"","m":""},{"q":"Explain what happens when cargo is placed on one side of the ship. What is an angle of list and how do you correct it?","s":"","m":""},{"q":"How is stability maintained during discharging? Explain the use of the loadicator.","s":"","m":""},{"q":"What hazards exist when using water to fight a fire? How does it affect stability?"},{"q":"How would you check the vessel's stability?"},{"q":"Why would you consider stopping cargo operations if the ballast water treatment system fails?"},{"q":"What are the various stresses encountered during loading operations?"},{"q":"The Chief Engineer wants to discharge machinery space bilges in a special area. What would you advise?"},{"q":"What are the intact stability requirements and what numerical values should you know?","s":"","m":"","tip":"Know IMO intact stability criteria: initial GM >= 0.15m, GZ at 30 deg >= 0.20m, max GZ at angle >= 25 deg, area under curve requirements."}],"Ship Joining & Familiarisation":[{"q":"What would you go over during your safety tour on a new vessel?","s":"","m":""},{"q":"What documents would you hand over to the Master upon joining?","s":"","m":""},{"q":"What would you check and observe before boarding a vessel?","s":"","m":""},{"q":"How would you familiarise yourself with the bridge as a new joiner?","s":"","m":""},{"q":"What do you expect from the company prior to joining a vessel for the first time?","s":"","m":""},{"q":"Describe the full familiarisation process you would expect when joining a new ship.","s":"","m":"","tip":"One candidate spent 10+ minutes on this answer and the examiner didn't interrupt — they liked the depth. Cover: safety familiarisation, bridge familiarisation, job-specific familiarisation, LSA/FFA locations, SOLAS training manual, muster list study."},{"q":"What would be involved in a safety and bridge familiarisation?","s":"","m":""},{"q":"Tell me everything about the gangway — rigging, angle, requirements.","s":"","m":""},{"q":"What are the procedures for gangway watch and familiarisation with the Master?","s":"","m":""},{"q":"How would you familiarise yourself with the ship overall?","s":"","m":""},{"q":"You have arrived at the gangway. What are you going to check before you board?","s":"","m":""},{"q":"What is the proper angle for the gangway and accommodation ladder?","s":"","m":""},{"q":"Describe the pilot boarding arrangements and your role as OOW.","s":"","m":""},{"q":"How should a proper gangway be rigged? What are the SOLAS requirements?","s":"","m":""},{"q":"You have gone up the gangway — what are you looking for on deck?","s":"","m":""},{"q":"Why is it important to clearly mark the pilot boarding area?","s":"","m":""},{"q":"You arrive on the quayside. What are you looking for before boarding?","s":"","m":""},{"q":"What would you expect to be included in your safety familiarisation?","s":"","m":""},{"q":"Joining the ship as a Third Officer — what would you check or expect to see before embarking?","s":"","m":""},{"q":"What would be included in your ship's familiarisation — safety, bridge, and job-specific?","s":"","m":""},{"q":"What do you expect before joining — from the company and upon arrival?","s":"","m":""},{"q":"What are the requirements for new joiners regarding familiarisation under STCW/ISM?","s":"","m":""},{"q":"What is the maximum safe angle for a gangway and for an accommodation ladder?","s":"","m":""},{"q":"What extra training is required for crew joining a passenger ship?"},{"q":"What is passenger familiarisation? What does it involve?"},{"q":"You have 4 hours before departure with the outgoing officer. What would your priorities be?"},{"q":"What would you expect from the outgoing Third Officer you are relieving?"},{"q":"What would you expect to happen in the 2nd Officer's relieving handover?"}],"Tanker Operations (Oil/Chemical/Gas)":[{"q":"How does nitrogen purging work on an oil/chemical tanker?","s":"","m":""},{"q":"What would be found in the SOPEP kit/equipment?","s":"","m":""},{"q":"Explain the inerting process on a tanker. Why is it done and what can excessive tank pressure do to the vessel?","s":"","m":""},{"q":"What are the hazards related to crude oil washing (COW)?","s":"","m":""},{"q":"What is SOPEP and how is it used on board?","s":"","m":""},{"q":"You have joined a tanker as Third Officer. How would you take over your duties?","s":"","m":""},{"q":"Explain the flammability diagram — including critical dilution with air, too rich/too lean, LEL, and UEL.","s":"","m":"","tip":"Examiners want you to DRAW it. Know the critical dilution line, the inert zone, and be able to explain how you move from an inerted atmosphere to gas-free safely. Referenced in ISGOTT."},{"q":"What is an Inert Gas (IG) system? What are its main components?","s":"","m":""},{"q":"What SOPEP equipment should be available at the manifold area?","s":"","m":""},{"q":"What is the difference between SOPEP and SMPEP?","s":"","m":""},{"q":"What is the Ship-Shore Safety Checklist and where do you find it?","s":"","m":""},{"q":"What are the hazards of static electricity during tanker operations?","s":"","m":""},{"q":"Explain the P&V (Pressure/Vacuum) valve and the mast riser. What are their functions?","s":"","m":""},{"q":"What are the categories of chemical cargoes (X, Y, Z)? Which code governs chemical tankers?","s":"","m":""},{"q":"What precautions should be taken during topping-off operations on a tanker?","s":"","m":""},{"q":"While on a tanker and loading, what would you check on deck?"},{"q":"On a tanker, you see a spill during loading. What are your actions?"}],"Watchkeeping & Bridge Procedures":[{"q":"How would you keep a safe navigational watch? What are your key responsibilities?","s":"","m":""},{"q":"Describe a watch handover at night in the middle of the ocean. What information would you expect?","s":"","m":""},{"q":"What are the duties of the gangway watchman? If they ask visitors to remove their belt, what are they looking for?","s":"","m":""},{"q":"How would you carry out a steering gear test prior to departure?","s":"","m":"","tip":"Know the specifics: 35° to 30° in 28 seconds maximum. Test from ALL bridge positions. Must be done within 12 hours before departure. One candidate was asked: 'what if the test result is 29 seconds?' — inform the master, who decides actions."},{"q":"How would you conduct a handover with your relieving officer?","s":"","m":""},{"q":"Your vessel has grounded. What actions would you take as OOW?","s":"","m":""},{"q":"How would you take over from the relieving officer?","s":"","m":""},{"q":"How would you maintain a safe navigational watch?","s":"","m":""},{"q":"How would you check the steering gear prior to departure? What are the requirements (degrees, timing)?","s":"","m":""},{"q":"The Second Officer was sick and signed off without a proper handover. Where would you find your duties and responsibilities?","s":"","m":"","tip":"Answer: the ship's SMS. This tests whether you know the SMS contains role-specific duties and responsibilities. Also mention standing orders and the bridge procedures guide."},{"q":"You are coming on for your first navigational watch. What would you expect in the handover?","s":"","m":""},{"q":"You are on the 12–4 watch. What will the handover include and what are your duties?","s":"","m":""},{"q":"What are your general duties as OOW?","s":"","m":""},{"q":"What log books are maintained by the OOW?","s":"","m":""},{"q":"Explain the steering gear test procedure in detail. What if the timed test result is 29 seconds instead of 28?","s":"","m":""},{"q":"You are getting ready to depart. What bridge checks would you carry out? Explain SERRCLIP.","s":"","m":""},{"q":"What are the duties of the OOW during pilotage? What actions would you take if you doubt the pilot's orders and the Master is not present?","s":"","m":"","tip":"You are ALWAYS responsible even with a pilot on board. If in doubt, challenge the pilot. If the pilot doesn't respond satisfactorily, call the master immediately. Do not blindly follow pilot orders."},{"q":"What will be the mode of steering during pilotage?","s":"","m":""},{"q":"How would you carry out a safe navigational watch during pilotage in daytime?","s":"","m":""},{"q":"What instructions would you give to the lookout?","s":"","m":"","tip":"One examiner asked: 'What will you tell the AB to report back?' If you don't include specific details about what to report (lights, sounds, objects, bearings), they will push back hard."},{"q":"How would you hand over to your relieving officer during a navigational watch at night?","s":"","m":""},{"q":"What are your duties as OOW in port?","s":"","m":""},{"q":"What would you expect from your watch handover?","s":"","m":""},{"q":"As OOW, what are your overall responsibilities?","s":"","m":""},{"q":"During pilotage, the helm reports steering is sluggish. What could be the cause?","s":"","m":""},{"q":"What documents would you hand over to the Master after introduction?","s":"","m":""},{"q":"You are taking over the 0800–1200 bridge watch. What does the handover include — position check, traffic, equipment, passage plan?"},{"q":"What are the 'call the Master' situations? Give examples."},{"q":"The pilot gives an order for 'hard over'. What are your actions? When should you question a pilot's orders?"},{"q":"The Master sends you to embark the pilot. What are your actions and what are you looking for?"},{"q":"The pilot is disembarking and the Master asks you to oversee the operation. What are you looking for?"},{"q":"How do you monitor the vessel's position in pilotage waters?"},{"q":"What are the Master's Standing Orders? What information do they typically contain?"},{"q":"What can you tell me about the duties of lookouts? What would you instruct them to report?"},{"q":"A steering failure occurs at sea. What are your immediate actions? How would you broadcast a VHF navigational safety message?"},{"q":"The main steering rudder is stuck at 10° to starboard. What are your actions?"},{"q":"How would you carry out an emergency steering gear drill? How often is it required?"},{"q":"What is a MSN, MGN, and MIN? Explain with examples."},{"q":"Tell me about M-Notices issued by the MCA."},{"q":"What medical advice and resources do you have on board?"},{"q":"What is the content of the weekly Notices to Mariners (NTM)?","s":"","m":"","tip":"Topic 1.1a from MIN 653. Know the structure: Section I-VI covering corrections, new charts, nav warnings, etc."},{"q":"What is a TSS and are they all mandatory?","s":"","m":"","tip":"See COLREG Rule 10(a). Not all TSS are mandatory — only those adopted by the IMO."},{"q":"How will you work with a compulsory pilot as OOW? What would you do if you anticipated the pilot sending the ship into danger?","s":"","m":""},{"q":"What factors affect the Master's decision regarding the composition of watches?","s":"","m":""},{"q":"What would you expect to be contained in the Master's Standing Orders?","s":"","m":""},{"q":"Two sailors are fighting on your watch. What are your actions?","s":"","m":"","tip":"Think safety first: separate them, report to Master, log the incident. Consider if either is injured."},{"q":"You come on watch and the OOW is asleep. What are your actions?","s":"","m":"","tip":"Do NOT just wake them — first assess the situation. Then wake, report to Master, log it. Consider STCW rest hours."},{"q":"Your lookout reports feeling tired during your watch. What are your actions?","s":"","m":""},{"q":"Your relieving officer arrives late for watch and you can smell alcohol. What are your actions?","s":"","m":"","tip":"Do not hand over. Inform the Master immediately. Refer to MGN 590 STCW Manila amendments alcohol limits."},{"q":"What will you find in the Bridge Procedures Guide? Would you ever not follow it, and why?","s":"","m":""},{"q":"How would you interact with the rest of the Bridge Team during the watch? How would you determine if they were fit for duty?","s":"","m":""}]};

const THEMES = {
  "Most Common Exam Scenarios": [
    "Dropped off at quay/taxi — describe what you observe approaching and joining the vessel",
    "Passage planning — usually a specific route (e.g. Southampton to Singapore, Brazil to Europe) going through all APEM stages",
    "ECDIS safety settings — calculating safety contour, safety depth, and shallow contour",
    "Radar plotting — shown blips on a radar screen, determine risk of collision, CPA/TCPA, and actions",
    "Fire alarm on the bridge panel / fire in the galley — step-by-step actions as OOW",
    "Man overboard — immediate actions, Williamson/Anderson turn, rescue boat launch",
    "Cargo watch takeover — what you check, what you expect in the handover",
    "Lifeboat drill / launching procedure — davit-launched, free-fall, rescue boat",
    "Muster list — contents, why ranks not names (UK ships), replacement personnel",
    "Buoyage identification — shown a cardinal/lateral mark, identify it and state actions based on heading",
    "COLREGS light identification — shown navigation lights, identify vessel type, status, and actions",
    "Synoptic chart reading — identify fronts, wind direction, weather conditions",
    "Steering gear test — full procedure, timing requirements (35°–30° in 28 seconds, within 12hrs of departure)",
    "Distress message — sending MAYDAY on DSC/VHF/MF/Inmarsat, preparing the distress message",
    "Garbage/food waste disposal — cook or bosun asks to dump waste, you explain MARPOL Annex V rules",
    "Steel coil loading — hazards, stability effects, hold preparation, CSM reference",
    "Pilot boarding and disembarkation — arrangements, OOW duties, ladder rigging",
    "Autopilot alarm in heavy weather — causes (gyro/GNSS/steering gear failure) and actions",
    "Near-miss reporting — procedure, who gets informed, safety committee",
    "PSC (Port State Control) — purpose of inspections, non-conformity vs major non-conformity",
    "Narrow channel overtaking — full procedure with sound signals",
    "Timber cargo — securing methods, moisture effects, quick-release requirements",
    "Car carrier operations — cargo planning, vehicle deck considerations, stability",
    "ECDIS limitations and errors — what happens when GPS fails, RCDS mode requirements",
    "CATZOC — chart data quality indicator on ECDIS, increasingly asked",
    "Restricted visibility — actions, fog signal changes, Rule 19 application",
    "NAVTEX setup — step by step, compulsory message types, station selection",
  ],
  "Key Publications & References": [
    "SOLAS — Safety of Life at Sea, the overarching convention (especially Ch. II, III, V)",
    "COLREGS — Collision Regulations, particularly Rules 5, 6, 7, 8, 10, 18, 19",
    "MARPOL — Annexes I–VI, especially Annex I (oil), Annex V (garbage), Annex VI (emissions)",
    "STCW — Standards of Training, Certification and Watchkeeping",
    "MLC — Maritime Labour Convention (SEA, work/rest hours, grievance procedures)",
    "ISM Code — International Safety Management (SMS, DPA, DOC, SMC, audits)",
    "ISPS Code — Ship Security (security levels 1–3, SSO, CSO, PFSO, ISSC)",
    "IMDG Code — International Maritime Dangerous Goods (classes 1–9, EMS, MFAG, segregation)",
    "ISGOTT — International Safety Guide for Oil Tankers & Terminals (flammability diagram, ship-shore checklist)",
    "IAMSAR Vol. III — Search and rescue guidance for merchant ships (on-scene procedures)",
    "IBC Code — International Code for the Construction and Equipment of Ships Carrying Dangerous Chemicals in Bulk",
    "IMSBC Code — International Maritime Solid Bulk Cargoes Code (TML, angle of repose, liquefaction)",
    "COSWP — Code of Safe Working Practices for Merchant Seafarers (UK H&S Bible)",
    "MGN 315 — Duties of the OOW / bridge watchkeeping",
    "MGN 560 — Launching of survival craft and rescue boats for drills",
    "MGN 321/641 — RoRo vessel cargo operations and loading guidance",
    "NP100 — Mariner's Handbook (dew point tables, general navigation reference)",
    "NP136 — Ocean Passages for the World (routing, limiting latitudes, ice limits)",
    "Routing Charts — currents, winds, ice limits, load line zones, great circle routes",
    "ALRS (NP281–286) — Admiralty List of Radio Signals (NAVTEX stations, GMDSS info)",
    "Chart 5011 / INT 1 — Symbols and abbreviations used on Admiralty charts",
    "Cargo Securing Manual (CSM) — vessel-specific guidance on lashing and securing",
    "Ship's SMS — Safety Management System: roles, procedures, checklists, emergency plans",
    "Bridge Procedures Guide — ICS publication covering bridge team management and checklists",
    "MIN 653 — Deck Oral Exam Syllabus (MCA examination guidance)",
    "MGN 71 — Contents and format of muster lists on UK vessels",
    "MGN 285 — ECDIS Risk Assessment methodology (required when operating in RCDS mode)",
    "SOPEP — Shipboard Oil Pollution Emergency Plan (equipment, reporting, actions)",
  ],
  "Critical COLREG Rules": [
    "Rule 2 — Responsibility (ordinary practice of seamen / special circumstances)",
    "Rule 5 — Look-out (by sight, hearing, and all available means)",
    "Rule 6 — Safe speed (all factors for all vessels + additional for vessels with radar)",
    "Rule 7 — Risk of collision (systematic observation, compass bearings, radar plotting)",
    "Rule 8 — Action to avoid collision (early, large, positive — avoid successive small alterations)",
    "Rule 10 — Traffic Separation Schemes (crossing at right angles, using ITZ, separation zone)",
    "Rule 13 — Overtaking (any vessel overtaking shall keep clear)",
    "Rule 14 — Head-on situation (both vessels alter to starboard)",
    "Rule 15 — Crossing situation (give way to vessel on starboard side)",
    "Rule 17 — Action by stand-on vessel (when give-way vessel fails to act)",
    "Rule 18 — Responsibilities between vessels (hierarchy: NUC > RAM > CBD > fishing > sailing > PDV)",
    "Rule 19 — Restricted visibility (avoid altering to port for vessel forward of beam; avoid altering towards vessel abeam or abaft)",
    "Rule 34 — Manoeuvring and warning signals",
    "Rule 35 — Sound signals in restricted visibility",
  ],
  "Frequently Tested Concepts": [
    "APEM — Appraisal, Planning, Execution, Monitoring (passage planning stages)",
    "Squat — effect in shallow water, how to identify and reduce it",
    "UKC — Under Keel Clearance calculation and monitoring",
    "Safety contour vs safety depth — ECDIS settings, how to calculate each",
    "Great circle vs rhumb line — advantages, disadvantages, composite great circle, gnomonic charts",
    "Limiting latitude — ice, weather, communications; where to find company policy",
    "Compass error — methods: transit bearing, amplitude, azimuth; deviation card",
    "Deviation and variation — what causes them, how to calculate, when to check",
    "Stiff vs tender vessel — GM effects, dangers of each, effect on crew and cargo",
    "List vs loll — causes, how to identify, how to correct each (crucial difference)",
    "Free surface effect — how it reduces GM, relevance during ballasting/deballasting",
    "TRS — signs of approach, determining semicircle, avoidance actions (Buys Ballot's Law)",
    "Dew point — calculation from hygrometer, use in predicting fog and cargo sweat",
    "Flammability diagram — LEL, UEL, too rich, too lean, critical dilution line (ISGOTT)",
    "HRU — how it works, markings, expiry, which equipment has one fitted",
    "EPIRB — activation, testing schedule, frequency (406 MHz), accidental activation procedure",
    "SART — operation, testing, radar display (12 dots), which radar band to use (X-band)",
    "Enclosed space entry — atmosphere testing (O₂, HC, toxic), ventilation, rescue equipment, permit to work",
    "DPA — Designated Person Ashore, role in ISM, link between ship and company",
    "Risk assessment — 5-step process, dynamic risk assessment, hierarchy of controls",
    "CAN test — quick test for moisture content of bulk cargo (transportable moisture limit)",
    "Williamson Turn — immediate MOB recovery, when to use vs Anderson Turn",
    "Watch handover — what to communicate: weather, traffic, nav warnings, standing orders, ECDIS/radar setup",
    "Pre-departure checks — SERRCLIP mnemonic (Steering, Engine, Radar, Radio, Communication, Lights, Internal comms, Publications)",
    "Rule 19 — the most-referenced COLREG rule in exams; know the restrictions on altering to port",
    "SEA — Seafarer Employment Agreement under MLC; contents and who requires it",
    "Ship-shore safety checklist — ISGOTT; completed before tanker cargo operations begin",
    "Presentation library — ECDIS display standards for chart symbols and features",
    "Near-miss vs incident — definitions, reporting requirements, role of safety committee",
    "RCDS mode — Raster Chart Display System; limitations and additional requirements when no ENC coverage",
    "Transverse thrust — propeller effect on vessel handling; important for berthing/unberthing",
    "XTD (Cross Track Distance) — ECDIS route check parameter; triggers alarms if vessel deviates",
    "CATZOC — Zone of Confidence categories on ECDIS; data quality and reliability indicator",
  ],
  "Certificates & Documents Examiners Expect You to Know": [
    "CoC — Certificate of Competency (OOW Unlimited)",
    "ECDIS Type-Specific Certificate — required to use ECDIS for watchkeeping and passage planning",
    "GoC — GMDSS General Operator's Certificate",
    "STCW Advanced Certificates — PSCRB, Advanced Fire Fighting, Medical Care, etc.",
    "DOC — Document of Compliance (company, under ISM)",
    "SMC — Safety Management Certificate (vessel, under ISM)",
    "ISSC — International Ship Security Certificate (under ISPS)",
    "IOPP — International Oil Pollution Prevention Certificate",
    "Load Line Certificate — from classification society, tied to load line survey",
    "Safety Equipment Certificate — covers LSA and FFA",
    "Safety Radio Certificate — covers GMDSS equipment",
    "Cargo Ship Safety Construction Certificate",
    "Ballast Water Management Certificate",
    "SEA — Seafarer Employment Agreement (under MLC)",
    "Discharge Book / Record of Sea Service",
    "ENG1 — Seafarer Medical Certificate (UK requirement)",
    "Dangerous Goods Certificate for Solid Bulk Cargoes (IMSBC)",
    "Passport and medical certificate (ENG1 for UK)",
  ],
  "Key M-Notices (MGN / MSN / MIN)": [
    "MGN 315 — Keeping a safe navigational watch on merchant vessels",
    "MGN 137 — Look-out during periods of darkness and restricted visibility",
    "MGN 299 — Inappropriate use of mobile phones whilst on duty",
    "MGN 324 Amendment 2 — Watchkeeping Safety – VHF Radio & AIS",
    "MGN 357 — Night time lookout: photochromic lenses and dark adaptation",
    "MGN 364 Amendment 2 — Traffic Separation Schemes Rule 10",
    "MGN 369 — Navigation in restricted visibility (Amendment 1)",
    "MGN 375 Amendment 1 — Maritime Safety Information",
    "MGN 477 Amendment 5 — SEA (Seafarer Employment Agreement)",
    "MGN 479 Amendment 1 — MLC 2006: Repatriation",
    "MGN 487 Amendment 2 — MLC 2006: On-Shore Complaints",
    "MGN 520 Amendment 2 — Human Element Guidance Part 2: The Deadly Dozen",
    "MGN 530 — Radio log book: merchant and fishing vessels",
    "MGN 539 Amendment 2 — Carriage of COSWP",
    "MGN 560 Amendment 2 — Servicing, testing, drilling of lifeboats and rescue boats",
    "MGN 590 — STCW Manila amendments: alcohol limits (Amendment 2)",
    "MGN 610 Amendment 1 — SOLAS Chapter V",
    "MGN 631 — Prevention of Pollution by Sewage (Amendment 1)",
    "MGN 632 Amendment 2 — Prevention of Pollution by Garbage",
    "MGN 636 Amendment 4 — Health and Safety at Work Regulations 1997",
    "MGN 638 Amendment 1 — Human Element Part 3: Distraction – Mobile Phones",
    "MGN 659 Amendment 2 — Entry into Enclosed Spaces Regulations 2022",
    "MGN 675 A1 — Control and Management of Ships' Ballast Water Regulations 2022",
    "MSN 1560 — Survival at sea",
    "MSN 1579 — Training required to assist passengers in an emergency",
    "MSN 1665 Amendment 1 — Fire fighting equipment",
    "MSN 1733 — Fire protection (amendment) regulations 1999",
    "MSN 1781 Amendment 3 — COLREG: Merchant Shipping Regulations 1996",
    "MSN 1819 — Prevention of Air Pollution from Ships",
    "MSN 1829 — Ship to ship transfer regulations 2020",
    "MSN 1832 Amendment 1 — Port State Control Regulations 2011",
    "MSN 1838 Amendment 1 — MLC 2006: Minimum Age",
    "MSN 1848 Amendment 3 — MLC Survey and certification of UK ships",
    "MSN 1849 — On-board complaints procedure",
    "MSN 1856 Amendment 1 — UK Requirements for Master and Deck Officers",
    "MSN 1868 Amendment 1 — UK requirements for safe manning and watchkeeping",
    "MSN 1870 Amendment 5 — Personal Protective Equipment Regulations 1999",
    "MSN 1877 Amendment 2 — Hours of work and entitlement to leave",
    "MSN 1899 — VTM Reporting Requirements for Ships and Ports",
    "MSN 1903 — GMDSS Ship Requirements",
    "MSN 1908 — Ballast Water and Sediments Regulations 2022",
    "MSN 1914 — Carriage of Dangerous Goods and Marine Pollutants",
    "MIN 653 Amendment 1 — Deck Oral Exam Syllabus",
    "MIN 687 — Changes to How Individuals Can Dispose of Marine Flares",
    "MIN 688 — COSWP Amendment 2 (2024)",
  ],
  "Examiner Tips & Study Advice": [
    "Voyage Planning — know Annex VI ECA fuel-change procedures (how much notice to ECR? Consult Chief Engineer for fuel system clearing time)",
    "Tide Calculation — revise this even if not used since Phase 1; examiners still test it",
    "Health & Safety — know specific SI names: Lifting Operations & Lifting Equipment Regs 2006, PPE Regs 1999, Enclosed Spaces Regs 2022",
    "COSWP — is NOT regulations; it is a Code that references SIs (similar to an MGN in status)",
    "ISM Code — don't just say 'SMS'; know the Code itself in depth, not just Safety Officer and DPA roles",
    "M-Notices — be prepared to name recent ones you've read and relate them to MAIB reports",
    "Know the different types — MGN (guidance/non-mandatory), MSN (mandatory), MIN (temporary information) and their enforceability",
    "ENC Cell Naming — understand the unique naming convention for electronic chart cells",
    "Default ECDIS safety settings — know what happens to contour settings if an officer forgets to input them",
    "Racon signals — know the emergency wreck marking signal (Morse 'D')",
    "Intact stability — know the actual numerical values, not just the concepts",
    "Rescue boat preparation — be able to describe full drill and MOB preparation step by step",
    "CAN test — know the procedure for testing moisture content of bulk cargo (transportable moisture limit)",
    "Conditions of Employment — understand SEA contents and the Master's Overriding Duty",
    "Fire extinguisher inspections — know the inspection regime and records required",
    "Under-18 protections — know the specific H&S requirements for young persons at sea",
  ],
};

const CATEGORY_ICONS = {
  "Navigation & Passage Planning": "🧭",
  "ECDIS & Electronic Navigation": "🖥️",
  "Radar, ARPA & Plotting": "📡",
  "COLREGS & Rules of the Road": "⚓",
  "Lights, Shapes & Buoyage": "💡",
  "Meteorology & Weather": "🌦️",
  "GMDSS & Communications": "📻",
  "Compass & Position Fixing": "🔭",
  "Safety, ISM & SMS": "🛡️",
  "Fire Safety & Fire Fighting": "🔥",
  "Life Saving Appliances (LSA)": "🆘",
  "Ship Construction & Stability": "🚢",
  "Cargo Operations (General/Bulk/Container)": "📦",
  "Tanker Operations (Oil/Chemical/Gas)": "🛢️",
  "Dangerous Goods (IMDG)": "☢️",
  "MARPOL & Pollution Prevention": "🌊",
  "SOLAS, Conventions & Certificates": "📜",
  "ISPS & Ship Security": "🔒",
  "Watchkeeping & Bridge Procedures": "👁️",
  "Emergencies & SAR": "🚨",
  "Anchoring & Mooring": "⚓",
  "Ship Joining & Familiarisation": "🚪",
};

const CATEGORY_PHOTOS = {
  "Navigation & Passage Planning": "photo-1764726411645-744d48aa4497",
  "Safety, ISM & SMS": "photo-1761798541154-ba2aca7c00e3",
  "Cargo Operations (General/Bulk/Container)": "photo-1634638022845-1ab614a94128",
  "Life Saving Appliances (LSA)": "photo-1536238253361-132d75ef874a",
  "Watchkeeping & Bridge Procedures": "photo-1641467613990-b74163e280e3",
  "Radar, ARPA & Plotting": "photo-1547411713-d8b9c8d1eaa7",
  "COLREGS & Rules of the Road": "photo-1701193550843-e3c79b6ff762",
  "Compass & Position Fixing": "photo-1566341013452-946caa457784",
  "SOLAS, Conventions & Certificates": "photo-1554224155-cfa08c2a758f",
  "ECDIS & Electronic Navigation": "photo-1604355231395-bf02775c357f",
  "Fire Safety & Fire Fighting": "photo-1563062067-723c14a7c7ba",
  "Meteorology & Weather": "photo-1762717563045-407f3bfde88f",
  "GMDSS & Communications": "photo-1758910071619-5bb4bdc5de68",
  "Lights, Shapes & Buoyage": "photo-1486944936280-f152c82ac151",
  "Ship Construction & Stability": "photo-1583765748164-627fa5124b49",
  "Ship Joining & Familiarisation": "photo-1666753762812-830603879d48",
  "Anchoring & Mooring": "photo-1760027192585-fd7c44c87be0",
  "Emergencies & SAR": "photo-1531570003789-62d56ed3b271",
  "MARPOL & Pollution Prevention": "photo-1771250851486-f5f7797393ad",
  "Tanker Operations (Oil/Chemical/Gas)": "photo-1763887487595-c94a790a9b01",
  "Dangerous Goods (IMDG)": "photo-1624021097786-e621f5e3d52d",
  "ISPS & Ship Security": "photo-1508345228704-935cc84bf5e2",
};

const CATEGORY_COLORS = {
  "Navigation & Passage Planning": "#0ea5e9",
  "ECDIS & Electronic Navigation": "#6366f1",
  "Radar, ARPA & Plotting": "#8b5cf6",
  "COLREGS & Rules of the Road": "#ef4444",
  "Lights, Shapes & Buoyage": "#f59e0b",
  "Meteorology & Weather": "#06b6d4",
  "GMDSS & Communications": "#10b981",
  "Compass & Position Fixing": "#f97316",
  "Safety, ISM & SMS": "#14b8a6",
  "Fire Safety & Fire Fighting": "#dc2626",
  "Life Saving Appliances (LSA)": "#e11d48",
  "Ship Construction & Stability": "#64748b",
  "Cargo Operations (General/Bulk/Container)": "#a855f7",
  "Tanker Operations (Oil/Chemical/Gas)": "#78716c",
  "Dangerous Goods (IMDG)": "#eab308",
  "MARPOL & Pollution Prevention": "#0284c7",
  "SOLAS, Conventions & Certificates": "#7c3aed",
  "ISPS & Ship Security": "#475569",
  "Watchkeeping & Bridge Procedures": "#0d9488",
  "Emergencies & SAR": "#b91c1c",
  "Anchoring & Mooring": "#0369a1",
  "Ship Joining & Familiarisation": "#059669",
};

// Blend a hex color with a background at a given alpha (0-1) to produce an opaque result
function blendHex(fg, bg, alpha) {
  const p = (s, i) => parseInt(s.slice(i, i + 2), 16);
  const r = Math.round(p(fg, 1) * alpha + p(bg, 1) * (1 - alpha));
  const g = Math.round(p(fg, 3) * alpha + p(bg, 3) * (1 - alpha));
  const b = Math.round(p(fg, 5) * alpha + p(bg, 5) * (1 - alpha));
  return `rgb(${r},${g},${b})`;
}

const THEME_ICONS = {
  "Most Common Exam Scenarios": "🎯",
  "Key Publications & References": "📚",
  "Critical COLREG Rules": "📐",
  "Frequently Tested Concepts": "🧠",
  "Certificates & Documents Examiners Expect You to Know": "📋",
  "Key M-Notices (MGN / MSN / MIN)": "📜",
  "Examiner Tips & Study Advice": "⚠️",
};

// Exam structure derived from ~200 real MCA OOW oral exam reports.
// Exams follow a narrative arc, not random questions. The examiner walks
// through a realistic scenario: arrive at ship → join → familiarise →
// plan voyage → depart → watchkeeping → emergencies → COLREGS/lights/buoyage.
// Each "phase" draws from specific categories. Within each phase, questions
// with examiner tips (from real reports) are weighted higher.

const EXAM_PHASES = [
  // Phase 1: Joining ship (1-2 Qs) — always first
  { name: "Joining", count: [1,2], cats: ["Ship Joining & Familiarisation","Safety, ISM & SMS","ISPS & Ship Security"],
    keywords: ["join","gangway","familiari","document","master","handover","security level","marsec","isps"] },
  // Phase 2: Safety familiarisation & LSA/FFA (2-3 Qs)
  { name: "Safety", count: [2,3], cats: ["Life Saving Appliances (LSA)","Fire Safety & Fire Fighting","Safety, ISM & SMS"],
    keywords: ["lifeboat","liferaft","fire","scba","extinguish","ism","sms","drill","muster","hru","epirb","sart"] },
  // Phase 3: Passage planning & navigation (3-4 Qs) — always a major block
  { name: "Passage Planning", count: [3,4], cats: ["Navigation & Passage Planning","ECDIS & Electronic Navigation","Compass & Position Fixing"],
    keywords: ["passage","appraisal","planning","route","chart","ecdis","safety contour","publication","sextant","compass error","position fix","gps","gnss"] },
  // Phase 4: Bridge equipment & radar (1-2 Qs)
  { name: "Bridge Equipment", count: [1,2], cats: ["Radar, ARPA & Plotting","ECDIS & Electronic Navigation","Watchkeeping & Bridge Procedures"],
    keywords: ["radar","arpa","parallel index","bridge","steering gear","autopilot","echo sounder"] },
  // Phase 5: Watchkeeping & meteorology (1-2 Qs)
  { name: "Watchkeeping", count: [1,2], cats: ["Watchkeeping & Bridge Procedures","Meteorology & Weather"],
    keywords: ["watch","lookout","synoptic","barometer","trs","tropical","fog","visibility","weather"] },
  // Phase 6: Cargo & stability (1-2 Qs)
  { name: "Cargo", count: [1,2], cats: ["Cargo Operations (General/Bulk/Container)","Tanker Operations (Oil/Chemical/Gas)","Dangerous Goods (IMDG)","Ship Construction & Stability"],
    keywords: ["cargo","stowage","stability","imdg","loading","discharge","ballast","gm","sf","bm","ig system","manifold"] },
  // Phase 7: Emergency scenarios (1-2 Qs) — MOB, fire, steering failure
  { name: "Emergencies", count: [1,2], cats: ["Emergencies & SAR","Fire Safety & Fire Fighting"],
    keywords: ["man overboard","mob","fire","emergency","abandon","distress","steering fail","enclosed space","grounding"] },
  // Phase 8: MARPOL & pollution (1 Q)
  { name: "MARPOL", count: [1,1], cats: ["MARPOL & Pollution Prevention","SOLAS, Conventions & Certificates"],
    keywords: ["marpol","annex","discharge","oily water","sopep","solas","convention","certificate","psc"] },
  // Phase 9: COLREGS scenarios (3-5 Qs) — always a big block near the end
  { name: "COLREGS", count: [3,5], cats: ["COLREGS & Rules of the Road","Lights, Shapes & Buoyage"],
    keywords: ["rule","colreg","crossing","overtaking","head-on","pdv","ram","nuc","cbd","fishing","towing","aground","restricted visibility","sound signal","light","cardinal","lateral","buoy","iala"] },
  // Phase 10: GMDSS & comms (1 Q) — often appears
  { name: "GMDSS", count: [0,1], cats: ["GMDSS & Communications"],
    keywords: ["gmdss","vhf","dsc","navtex","inmarsat","sea area","distress alert","mayday"] },
  // Phase 11: Anchoring/mooring (0-1 Q) — sometimes appears
  { name: "Anchoring", count: [0,1], cats: ["Anchoring & Mooring"],
    keywords: ["anchor","mooring","berthing","pilot","squat","interaction"] },
];

function extractKeyPhrases(themeItems) {
  const phrases = [];
  themeItems.forEach(item => {
    const main = item.split(" — ")[0].split(" – ")[0].toLowerCase().trim();
    phrases.push(main);
    main.split(/\s+/).filter(w => w.length >= 4).forEach(w => phrases.push(w));
  });
  return [...new Set(phrases)];
}

// Categories that examiners throw in as curveballs — less predictable topics
const CURVEBALL_CATS = [
  "ISPS & Ship Security", "Dangerous Goods (IMDG)",
  "Ship Construction & Stability", "Tanker Operations (Oil/Chemical/Gas)",
  "SOLAS, Conventions & Certificates"
];

function buildExamPool(questionCount) {
  // Pre-compute keyword boosts from THEMES
  const scenarioKeys = extractKeyPhrases(THEMES["Most Common Exam Scenarios"] || []);
  const conceptKeys = extractKeyPhrases(THEMES["Frequently Tested Concepts"] || []);
  const colregKeys = extractKeyPhrases(THEMES["Critical COLREG Rules"] || []);

  // Flatten all questions with weights
  const allByCategory = {};
  Object.entries(QUESTIONS).forEach(([cat, qs]) => {
    allByCategory[cat] = qs.map(q => {
      const qLower = q.q.toLowerCase();
      let weight = 1.0;
      if (scenarioKeys.some(k => qLower.includes(k) || cat.toLowerCase().includes(k))) weight += 2.0;
      if (conceptKeys.some(k => qLower.includes(k))) weight += 1.5;
      if (cat === "COLREGS & Rules of the Road" || cat === "Lights, Shapes & Buoyage") weight += 1.0;
      else if (colregKeys.some(k => qLower.includes(k))) weight += 0.5;
      if (q.tip) weight += 2.0;
      return { ...q, cat, _weight: weight, isFollowOn: false, followOnParentIdx: null };
    });
  });

  const usedQs = new Set();

  // Pick from a candidate pool using weighted random, avoiding duplicates
  const pickWeighted = (candidates, n) => {
    const available = candidates.filter(q => !usedQs.has(q.q));
    const picks = [];
    const remaining = [...available];
    for (let i = 0; i < n && remaining.length > 0; i++) {
      const totalW = remaining.reduce((s, r) => s + r._weight, 0);
      let rand = Math.random() * totalW, cum = 0;
      for (let j = 0; j < remaining.length; j++) {
        cum += remaining[j]._weight;
        if (cum >= rand) {
          picks.push(remaining[j]);
          usedQs.add(remaining[j].q);
          remaining.splice(j, 1);
          break;
        }
      }
    }
    return picks;
  };

  // --- Step 1: Build phase order with variability ---
  // Copy phases so we can shuffle adjacent ones
  const phases = EXAM_PHASES.map(p => ({ ...p }));

  // ~30% chance to swap each pair of adjacent mid-phases (indices 2-8)
  // Joining (0) and Safety (1) always stay first; COLREGS (8) always stays late
  for (let i = 2; i < Math.min(phases.length - 2, 8); i++) {
    if (Math.random() < 0.3) {
      [phases[i], phases[i + 1]] = [phases[i + 1], phases[i]];
      i++; // skip next so we don't double-swap
    }
  }

  // --- Step 2: Reserve curveball slots (2-3 questions) ---
  const curveballCount = 2 + Math.floor(Math.random() * 2); // 2 or 3
  const mainSlots = questionCount - curveballCount;

  // --- Step 3: Walk through phases for main questions ---
  const phaseResults = [];
  phases.forEach(phase => {
    const min = phase.count[0], max = phase.count[1];
    const n = min + Math.floor(Math.random() * (max - min + 1));
    if (n === 0) return;

    let candidates = [];
    phase.cats.forEach(cat => {
      if (allByCategory[cat]) candidates.push(...allByCategory[cat]);
    });

    // Boost candidates that match phase keywords
    candidates = candidates.map(q => {
      const qLower = q.q.toLowerCase();
      const kwBoost = phase.keywords.filter(k => qLower.includes(k)).length;
      return { ...q, _weight: q._weight + kwBoost * 1.0 };
    });

    const picks = pickWeighted(candidates, n);
    phaseResults.push(...picks);
  });

  // Trim main results to mainSlots if we went over
  while (phaseResults.length > mainSlots) phaseResults.pop();

  // --- Step 4: Pick curveball questions from underrepresented categories ---
  const usedCats = new Set(phaseResults.map(q => q.cat));
  // Prefer curveball cats that weren't already covered
  let curveballCandidates = CURVEBALL_CATS
    .filter(cat => !usedCats.has(cat) || Math.random() < 0.3)
    .flatMap(cat => (allByCategory[cat] || []).filter(q => !usedQs.has(q.q)));

  // If not enough curveball candidates, pull from any unused category
  if (curveballCandidates.length < curveballCount) {
    const extraCats = Object.keys(allByCategory).filter(cat => !usedCats.has(cat));
    curveballCandidates.push(
      ...extraCats.flatMap(cat => (allByCategory[cat] || []).filter(q => !usedQs.has(q.q)))
    );
  }

  const curveballs = pickWeighted(curveballCandidates, curveballCount);

  // --- Step 5: Insert curveballs at random positions (not first 2 or last 2) ---
  const result = [...phaseResults];
  curveballs.forEach(cb => {
    const minPos = Math.min(2, result.length);
    const maxPos = Math.max(minPos + 1, result.length - 1);
    const pos = minPos + Math.floor(Math.random() * (maxPos - minPos));
    result.splice(pos, 0, cb);
  });

  // --- Step 6: Fill if short, trim if over ---
  if (result.length < questionCount) {
    const allRemaining = Object.values(allByCategory).flat().filter(q => !usedQs.has(q.q));
    const extra = pickWeighted(allRemaining, questionCount - result.length);
    result.push(...extra);
  }
  while (result.length > questionCount) result.pop();

  // Clean up internal _weight
  return result.map(q => { const { _weight, ...rest } = q; return rest; });
}

// Topic adjacency map — each category's related topics for cross-referencing
const RELATED_TOPICS = {
  "Navigation & Passage Planning": ["ECDIS & Electronic Navigation","Compass & Position Fixing","Meteorology & Weather","Watchkeeping & Bridge Procedures","Lights, Shapes & Buoyage"],
  "ECDIS & Electronic Navigation": ["Navigation & Passage Planning","Radar, ARPA & Plotting","Compass & Position Fixing","Watchkeeping & Bridge Procedures"],
  "Radar, ARPA & Plotting": ["ECDIS & Electronic Navigation","Navigation & Passage Planning","COLREGS & Rules of the Road","Watchkeeping & Bridge Procedures"],
  "COLREGS & Rules of the Road": ["Lights, Shapes & Buoyage","Watchkeeping & Bridge Procedures","Radar, ARPA & Plotting","Navigation & Passage Planning"],
  "Lights, Shapes & Buoyage": ["COLREGS & Rules of the Road","Navigation & Passage Planning","Watchkeeping & Bridge Procedures"],
  "Meteorology & Weather": ["Navigation & Passage Planning","Watchkeeping & Bridge Procedures","Ship Construction & Stability"],
  "GMDSS & Communications": ["Emergencies & SAR","SOLAS, Conventions & Certificates","Watchkeeping & Bridge Procedures"],
  "Compass & Position Fixing": ["Navigation & Passage Planning","ECDIS & Electronic Navigation","Radar, ARPA & Plotting"],
  "Safety, ISM & SMS": ["SOLAS, Conventions & Certificates","ISPS & Ship Security","Ship Joining & Familiarisation","Fire Safety & Fire Fighting"],
  "Fire Safety & Fire Fighting": ["Safety, ISM & SMS","Life Saving Appliances (LSA)","Emergencies & SAR","SOLAS, Conventions & Certificates"],
  "Life Saving Appliances (LSA)": ["Fire Safety & Fire Fighting","Emergencies & SAR","Safety, ISM & SMS","SOLAS, Conventions & Certificates"],
  "Ship Construction & Stability": ["Cargo Operations (General/Bulk/Container)","MARPOL & Pollution Prevention","SOLAS, Conventions & Certificates"],
  "Cargo Operations (General/Bulk/Container)": ["Ship Construction & Stability","Dangerous Goods (IMDG)","Tanker Operations (Oil/Chemical/Gas)","MARPOL & Pollution Prevention"],
  "Tanker Operations (Oil/Chemical/Gas)": ["Cargo Operations (General/Bulk/Container)","MARPOL & Pollution Prevention","Safety, ISM & SMS","Dangerous Goods (IMDG)"],
  "Dangerous Goods (IMDG)": ["Cargo Operations (General/Bulk/Container)","Tanker Operations (Oil/Chemical/Gas)","Fire Safety & Fire Fighting"],
  "MARPOL & Pollution Prevention": ["Cargo Operations (General/Bulk/Container)","Tanker Operations (Oil/Chemical/Gas)","SOLAS, Conventions & Certificates","Ship Construction & Stability"],
  "SOLAS, Conventions & Certificates": ["Safety, ISM & SMS","Life Saving Appliances (LSA)","Fire Safety & Fire Fighting","MARPOL & Pollution Prevention","ISPS & Ship Security"],
  "ISPS & Ship Security": ["Safety, ISM & SMS","SOLAS, Conventions & Certificates","Ship Joining & Familiarisation","Watchkeeping & Bridge Procedures"],
  "Watchkeeping & Bridge Procedures": ["Navigation & Passage Planning","COLREGS & Rules of the Road","Radar, ARPA & Plotting","ECDIS & Electronic Navigation"],
  "Emergencies & SAR": ["Life Saving Appliances (LSA)","Fire Safety & Fire Fighting","GMDSS & Communications","Safety, ISM & SMS"],
  "Anchoring & Mooring": ["Navigation & Passage Planning","Ship Construction & Stability","Watchkeeping & Bridge Procedures"],
  "Ship Joining & Familiarisation": ["Safety, ISM & SMS","ISPS & Ship Security","SOLAS, Conventions & Certificates"],
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── PART A DATA ──────────────────────────────────────────────────────────────
const IMDG_CLASSES = [
  { id:"1",   name:"Explosives",                  img:"/quiz-images/imdg/class-1.png",
    hint:"{Explosives}" },
  { id:"2",   name:"Gases",
    hint:"{Gases}" },
  { id:"2.1", name:"Flammable gases",             img:"/quiz-images/imdg/class-2.1.png",
    hint:"{Flammable} gases" },
  { id:"2.2", name:"Non-flammable, non-toxic gases", img:"/quiz-images/imdg/class-2.2.png",
    hint:"Non-{flammable}, non-{toxic} gases" },
  { id:"2.3", name:"Toxic gases",                 img:"/quiz-images/imdg/class-2.3.png",
    hint:"{Toxic} gases" },
  { id:"3",   name:"Flammable liquids",           img:"/quiz-images/imdg/class-3.png",
    hint:"{Flammable} {liquids}" },
  { id:"4.1", name:"Flammable Solids",            img:"/quiz-images/imdg/class-4.1.png",
    hint:"{Flammable} {Solids}" },
  { id:"4.2", name:"Substances liable to spontaneous combustion", img:"/quiz-images/imdg/class-4.2.png",
    hint:"Substances liable to {spontaneous} {combustion}" },
  { id:"4.3", name:"Substances which, in contact with water, emit flammable gases", img:"/quiz-images/imdg/class-4.3.png",
    hint:"Substances which, in contact with water, emit {flammable} gases" },
  { id:"5",   name:"Oxidizing substances and organic peroxides",
    hint:"{Oxidizing} substances and organic {peroxides}" },
  { id:"5.1", name:"Oxidizing substances",        img:"/quiz-images/imdg/class-5.1.png",
    hint:"{Oxidizing} substances" },
  { id:"5.2", name:"Organic peroxides",           img:"/quiz-images/imdg/class-5.2.png",
    hint:"Organic {peroxides}" },
  { id:"6",   name:"Toxic and infectious substances",
    hint:"{Toxic} and {infectious} substances" },
  { id:"6.1", name:"Toxic substances",            img:"/quiz-images/imdg/class-6.1.png",
    hint:"{Toxic} substances" },
  { id:"6.2", name:"Infectious substances",       img:"/quiz-images/imdg/class-6.2.png",
    hint:"{Infectious} substances" },
  { id:"7",   name:"Radioactive material",        img:"/quiz-images/imdg/class-7.png",
    hint:"{Radioactive} material" },
  { id:"8",   name:"Corrosive substances",        img:"/quiz-images/imdg/class-8.png",
    hint:"{Corrosive} substances" },
  { id:"9",   name:"Miscellaneous dangerous substances and articles", img:"/quiz-images/imdg/class-9.png",
    hint:"{Miscellaneous} dangerous substances and articles" },
];

const SOLAS_CHAPTERS = [
  { id:"I",     name:"General Provisions",
    hint:"General {Provisions}" },
  { id:"II-1",  name:"Construction – Subdivision and Stability, Machinery and Electrical Installations",
    hint:"Construction – {Subdivision} and {Stability}, {Machinery} and Electrical {Installations}" },
  { id:"II-2",  name:"Construction – Fire Protection, Fire Detection and Fire Extinction",
    hint:"Construction – Fire {Protection}, Fire {Detection} and Fire {Extinction}" },
  { id:"III",   name:"Life-Saving Appliances and Arrangements",
    hint:"Life-Saving {Appliances} and {Arrangements}" },
  { id:"IV",    name:"Radiocommunications (GMDSS)",
    hint:"{Radiocommunications} (GMDSS)" },
  { id:"V",     name:"Safety of Navigation",
    hint:"Safety of {Navigation}" },
  { id:"VI",    name:"Carriage of Cargoes and Oil Fuels",
    hint:"Carriage of {Cargoes} and Oil {Fuels}" },
  { id:"VII",   name:"Carriage of Dangerous Goods",
    hint:"Carriage of {Dangerous} {Goods}" },
  { id:"VIII",  name:"Nuclear Ships",
    hint:"{Nuclear} Ships" },
  { id:"IX",    name:"Management for the Safe Operation of Ships (ISM Code)",
    hint:"{Management} for the Safe {Operation} of Ships (ISM Code)" },
  { id:"X",     name:"Safety Measures for High-Speed Craft",
    hint:"Safety Measures for {High}-Speed {Craft}" },
  { id:"XI-1",  name:"Special Measures to Enhance Maritime Safety",
    hint:"{Special} Measures to Enhance Maritime {Safety}" },
  { id:"XI-2",  name:"Special Measures to Enhance Maritime Security (ISPS Code)",
    hint:"{Special} Measures to Enhance Maritime {Security} (ISPS Code)" },
  { id:"XII",   name:"Additional Safety Measures for Bulk Carriers",
    hint:"{Additional} Safety Measures for {Bulk} {Carriers}" },
  { id:"XIII",  name:"Verification of Compliance (IMO Member State Audit Scheme)",
    hint:"{Verification} of {Compliance} (IMO Member State Audit Scheme)" },
  { id:"XIV",   name:"Safety Measures for Ships Operating in Polar Waters (Polar Code)",
    hint:"Safety Measures for Ships {Operating} in {Polar} {Waters} (Polar Code)" },
  { id:"XV",    name:"Safety Measures for Ships Carrying Industrial Personnel",
    hint:"Safety Measures for Ships {Carrying} {Industrial} {Personnel}" },
];

// ── SOLAS Numbers Game: title → roman numeral (MC) ──────────────────────────
const SOLAS_NUMBERS_QUIZ = (() => {
  const allIds = SOLAS_CHAPTERS.map(c => c.id);
  return SOLAS_CHAPTERS.map((ch, i) => ({
    id:`sn-${i}`, q:ch.name, correct:ch.id, options:allIds
  }));
})();

const PILOT_LADDER_QUIZ = [
  // ── Freeboard of 9m or less ──────────────────────────────────────────────
  {
    id:"q1", section:"Freeboard of 9m or less",
    q:"What is the minimum diameter of the handhold stanchions?",
    correct:"32mm minimum, positioned at least 120cm above the bulwark",
    options:[
      "28mm minimum, positioned at least 100cm above the bulwark",
      "32mm minimum, positioned at least 120cm above the bulwark",
      "40mm minimum, positioned at least 150cm above the bulwark",
      "25mm minimum, positioned at least 90cm above the bulwark",
    ]
  },
  {
    id:"q2", section:"Freeboard of 9m or less",
    q:"What are the handhold size requirements?",
    correct:"Minimum 70cm, maximum 80cm",
    options:[
      "Minimum 70cm, maximum 80cm",
      "Minimum 60cm, maximum 75cm",
      "Minimum 80cm, maximum 90cm",
      "Minimum 65cm, maximum 85cm",
    ]
  },
  {
    id:"q3", section:"Freeboard of 9m or less",
    q:"What are the diameter requirements for man-ropes?",
    correct:"Minimum 28mm, maximum 32mm — only required if requested by the pilot",
    options:[
      "Minimum 32mm, maximum 38mm — always required",
      "Minimum 24mm, maximum 28mm — only if requested by the pilot",
      "Minimum 28mm, maximum 32mm — only required if requested by the pilot",
      "Minimum 30mm, maximum 36mm — always required",
    ]
  },
  {
    id:"q4", section:"Freeboard of 9m or less",
    q:"What is the minimum diameter for side ropes?",
    correct:"18mm",
    options:["14mm", "16mm", "18mm", "22mm"]
  },
  {
    id:"q5", section:"Freeboard of 9m or less",
    q:"What are the requirements for all steps on the ladder?",
    correct:"Firmly against ship's side, at least 40cm wide, spaced 31–35cm apart",
    options:[
      "Firmly against ship's side, at least 40cm wide, spaced 31–35cm apart",
      "Firmly against ship's side, at least 45cm wide, spaced 28–32cm apart",
      "Firmly against ship's side, at least 35cm wide, spaced 30–34cm apart",
      "Firmly against ship's side, at least 40cm wide, spaced 25–30cm apart",
    ]
  },
  {
    id:"q6", section:"Freeboard of 9m or less",
    q:"What is the minimum length of a spreader?",
    correct:"180cm",
    options:["150cm", "200cm", "180cm", "160cm"]
  },
  {
    id:"q7", section:"Freeboard of 9m or less",
    q:"How many steps are allowed between spreaders?",
    correct:"Maximum 9 steps",
    options:["Maximum 7 steps", "Maximum 9 steps", "Maximum 12 steps", "Maximum 5 steps"]
  },
  {
    id:"q8", section:"Freeboard of 9m or less",
    q:"Which step from the bottom must be a spreader?",
    correct:"The 5th step from the bottom",
    options:["The 3rd step from the bottom", "The 5th step from the bottom", "The 7th step from the bottom", "The 4th step from the bottom"]
  },
  {
    id:"q9", section:"Freeboard of 9m or less",
    q:"How much unobstructed ship's side is required?",
    correct:"6 metres",
    options:["4 metres", "8 metres", "5 metres", "6 metres"]
  },
  {
    id:"q10", section:"Freeboard of 9m or less",
    q:"Who determines the required boarding height?",
    correct:"The Pilot",
    options:["The Master", "The Pilot", "The Port Authority", "The Harbour Master"]
  },
  // ── Combination arrangement — freeboard over 9m ──────────────────────────
  {
    id:"q11", section:"Combination arrangement — freeboard over 9m",
    q:"When is a combination arrangement required?",
    correct:"When freeboard exceeds 9 metres and no side door is available",
    options:[
      "When freeboard exceeds 6 metres and no gangway is available",
      "When freeboard exceeds 9 metres and no side door is available",
      "When freeboard exceeds 12 metres regardless of side door availability",
      "When freeboard exceeds 9 metres and the pilot requests it",
    ]
  },
  {
    id:"q12", section:"Combination arrangement — freeboard over 9m",
    q:"How far must the pilot ladder extend above the lower platform?",
    correct:"At least 2 metres above the lower platform",
    options:[
      "At least 1 metre above the lower platform",
      "At least 1.5 metres above the lower platform",
      "At least 2 metres above the lower platform",
      "At least 3 metres above the lower platform",
    ]
  },
  {
    id:"q13", section:"Combination arrangement — freeboard over 9m",
    q:"How high above the accommodation platform must the ladder be firmly attached to the ship's side?",
    correct:"1.5 metres above the accommodation platform",
    options:[
      "0.5 metres above the accommodation platform",
      "1 metre above the accommodation platform",
      "1.5 metres above the accommodation platform",
      "2 metres above the accommodation platform",
    ]
  },
  {
    id:"q14", section:"Combination arrangement — freeboard over 9m",
    q:"What are the climb requirements for the pilot ladder in a combination arrangement?",
    correct:"Not less than 1.5 metres and no more than 9 metres",
    options:[
      "Not less than 1 metre and no more than 6 metres",
      "Not less than 1.5 metres and no more than 9 metres",
      "Not less than 2 metres and no more than 12 metres",
      "Not less than 1.5 metres and no more than 6 metres",
    ]
  },
  {
    id:"q15", section:"Combination arrangement — freeboard over 9m",
    q:"What is the maximum slope allowed for the accommodation ladder?",
    correct:"45 degrees",
    options:["30 degrees", "45 degrees", "55 degrees", "60 degrees"]
  },
  {
    id:"q16", section:"Combination arrangement — freeboard over 9m",
    q:"Which direction should the accommodation ladder lead?",
    correct:"Aft",
    options:["Forward", "Aft", "Perpendicular to the ship's side", "Either forward or aft depending on conditions"]
  },
  {
    id:"q17", section:"Combination arrangement — freeboard over 9m",
    q:"What is the minimum height of the lower platform above the sea?",
    correct:"5 metres above the sea",
    options:["3 metres above the sea", "4 metres above the sea", "5 metres above the sea", "6 metres above the sea"]
  },
  {
    id:"q18", section:"Combination arrangement — freeboard over 9m",
    q:"What must the lower platform be?",
    correct:"Horizontal",
    options:[
      "Horizontal",
      "At a 5 degree angle to assist boarding",
      "Inclined at the same angle as the accommodation ladder",
      "Non-slip but at any angle",
    ]
  },
  {
    id:"q19", section:"Combination arrangement — freeboard over 9m",
    q:"What is the recommended freeboard mark measurement?",
    correct:"9 metres, with 2 metre sections indicated on the gauge",
    options:[
      "6 metres, with 1 metre sections indicated on the gauge",
      "9 metres, with 1 metre sections indicated on the gauge",
      "9 metres, with 2 metre sections indicated on the gauge",
      "12 metres, with 3 metre sections indicated on the gauge",
    ]
  },
  {
    id:"q20", section:"Combination arrangement — freeboard over 9m",
    q:"How should the accommodation ladder be secured to the ship's side?",
    correct:"Using an eyepad, magnetic, or pneumatic system",
    options:[
      "Using rope lashing or chain systems only",
      "Using a fixed bracket welded to the ship's side",
      "Using an eyepad, magnetic, or pneumatic system",
      "Using a hydraulic or electric stanchion system",
    ]
  },
];

// ─── MARPOL ANNEX 1 ──────────────────────────────────────────────────────────
const MARPOL_ANNEX1 = [
  // DEFINITIONS
  { id:"ma1", type:"flashcard",
    front:"What is the MARPOL Annex 1 definition of crude oil?",
    back:"Any liquid hydrocarbon mixture occurring naturally in the earth, whether or not treated to render it suitable for transportation." },
  { id:"ma2", type:"flashcard",
    front:"What is the MARPOL Annex 1 definition of an oily mixture?",
    back:"A mixture with any oil content. There is no minimum threshold — any amount of oil qualifies." },
  { id:"ma3", type:"mc",
    q:"'A mixture with any oil content' — which term does this define?",
    correct:"Oily mixture",
    options:["Crude oil","Oily mixture","Oil residue","Dirty ballast"] },
  // EXCEPTION CLAUSE
  { id:"ma4", type:"mc",
    q:"In what circumstances do the standard oil discharge rules NOT apply?",
    correct:"Security, safety, or saving life at sea — or from damage to the ship, provided all reasonable measures were taken",
    options:[
      "Security, safety, or saving life at sea — or from damage to the ship, provided all reasonable measures were taken",
      "Force majeure, bad weather, or port authority approval",
      "Flag state exemption, or when the nearest port is more than 200nm away",
      "Captain's discretion, or when sea state exceeds Beaufort 8",
    ] },
  { id:"ma5", type:"tf",
    q:"The exception to discharge rules is void if the master or owner acted recklessly, even if the situation was a genuine emergency.",
    correct:true,
    explanation:"Correct. The exception is void if the master or owner acted recklessly or with intent to cause harm or damage. This prevents deliberate misuse of the exception." },
  { id:"ma6", type:"tf",
    q:"The discharge exception for safety/security applies even if the master intentionally caused the situation that made it necessary.",
    correct:false,
    explanation:"False. The exception is void if the master or owner acted recklessly or with intent to cause harm or damage. Intentionally causing the situation removes the protection entirely." },
  { id:"ma7", type:"multi",
    q:"Select BOTH: (a) the circumstance where discharge rules do not apply, AND (b) the condition that makes this exception void.",
    correct:[
      "Discharge relating to security, safety, or saving life at sea, or from damage to the ship",
      "Void if the master or owner acted recklessly or with intent to cause harm or damage",
    ],
    options:[
      "Discharge relating to security, safety, or saving life at sea, or from damage to the ship",
      "Void if the master or owner acted recklessly or with intent to cause harm or damage",
      "Discharge when at anchor in a sheltered bay approved by port authority",
      "Void if discharge not reported to coastal state within 24 hours",
      "Discharge when sea state exceeds Beaufort force 7",
    ] },
  // SPECIAL AREAS
  { id:"ma8", type:"select-all",
    q:"Select ALL MARPOL Annex 1 special areas:",
    correct:[
      "Mediterranean Sea area","Baltic Sea area","Black Sea area","Red Sea area",
      "Gulfs area","Gulf of Aden area","Antarctic areas",
      "North West European waters","Oman area of the Arabian Sea","Southern South African waters",
    ],
    options:[
      "Mediterranean Sea area","English Channel","Baltic Sea area","Bay of Biscay",
      "Black Sea area","Red Sea area","Gulfs area","Gulf of Aden area",
      "Antarctic areas","North West European waters","Oman area of the Arabian Sea",
      "Southern South African waters","Strait of Malacca","Caribbean Sea",
    ] },
  { id:"ma9", type:"mc",
    q:"Which of these is NOT a MARPOL Annex 1 special area?",
    correct:"English Channel",
    options:["Mediterranean Sea area","English Channel","Red Sea area","Gulf of Aden area"] },
  { id:"ma10", type:"tf",
    q:"The Arctic Ocean is listed as a MARPOL Annex 1 special area.",
    correct:false,
    explanation:"The Arctic is NOT a named special area. The rules say 'outside/inside special area except in arctic waters' — meaning arctic waters have their own separate, stricter regime independent of the special area system." },
  // MACHINERY SPACE DISCHARGE
  { id:"ma11", type:"mc",
    q:"What is the maximum permitted oil content of effluent discharged from machinery spaces?",
    correct:"15 ppm",
    options:["5 ppm","15 ppm","30 ppm","50 ppm"] },
  { id:"ma12", type:"mc",
    q:"Machinery space bilge discharge restrictions apply to ships other than oil tankers of what minimum gross tonnage?",
    correct:"400 GT and above",
    options:["150 GT and above","250 GT and above","400 GT and above","500 GT and above"] },
  { id:"ma13", type:"mc",
    q:"Four of the five conditions for machinery space discharge outside a special area are: ship enroute, effluent under 15ppm, mixture not from cargo pump-room bilges (tankers), mixture not mixed with cargo residues (tankers). What is the missing fifth condition?",
    correct:"The oily mixture must be processed through approved oil filtering equipment",
    options:[
      "Discharge must be reported to the nearest coastal state",
      "The oily mixture must be processed through approved oil filtering equipment",
      "The ship must be more than 12 nautical miles from nearest land",
      "Discharge must take place during daylight hours only",
    ] },
  { id:"ma14", type:"tf",
    q:"Inside a special area, the maximum permitted oil content of effluent from machinery spaces drops to 5ppm (versus 15ppm outside).",
    correct:false,
    explanation:"False. The 15ppm limit applies both inside AND outside special areas. The only difference is the standard the filtering equipment must meet — a stricter standard is required inside a special area." },
  { id:"ma15", type:"multi",
    q:"When discharging bilge water, TWO conditions apply specifically to oil tankers (beyond those for all ships). Select both.",
    correct:[
      "The oily mixture must not originate from cargo pump-room bilges",
      "The oily mixture must not be mixed with oil cargo residues",
    ],
    options:[
      "The ship must be more than 50nm from the nearest land",
      "The oily mixture must not originate from cargo pump-room bilges",
      "The effluent must not exceed 15ppm",
      "The oily mixture must not be mixed with oil cargo residues",
      "The ship must be proceeding enroute",
    ] },
  { id:"ma16", type:"sort",
    q:"Sort these bilge water discharge conditions — do they apply to ALL ships, or OIL TANKERS ONLY?",
    categories:["All ships","Oil tankers only"],
    items:[
      { text:"Ship must be proceeding enroute", cat:"All ships" },
      { text:"Effluent must not exceed 15ppm", cat:"All ships" },
      { text:"Must pass through approved filtering equipment", cat:"All ships" },
      { text:"Must not originate from cargo pump-room bilges", cat:"Oil tankers only" },
      { text:"Must not be mixed with oil cargo residues", cat:"Oil tankers only" },
    ] },
  { id:"ma17", type:"mc",
    q:"When discharging bilge water, what is the ONLY difference between the conditions required inside a special area versus outside?",
    correct:"The filtering equipment must meet a stricter standard inside a special area",
    options:[
      "The maximum oil content drops to 5ppm inside vs 15ppm outside",
      "The filtering equipment must meet a stricter standard inside a special area",
      "The ship must be more than 50nm from land inside a special area",
      "Additional reporting to port state is required inside a special area",
    ] },
  { id:"ma18", type:"tf",
    q:"A 500 GT cargo ship is underway in the Mediterranean, discharging bilge water at 12ppm through its approved filter. The mixture is from the engine room only. This discharge is lawful.",
    correct:false,
    explanation:"The Mediterranean is a special area. Inside special areas, the filtering equipment must meet a stricter standard. The scenario says 'approved filter' but does not confirm it meets the higher special area standard — and the distinction is critical." },
  // TANKER CARGO DISCHARGE
  { id:"ma19", type:"tf",
    q:"An oil tanker may discharge cargo residues inside a special area, provided all the required conditions are satisfied.",
    correct:false,
    explanation:"False. Discharge of cargo residues from the cargo area is simply prohibited inside special areas — there are no conditions that permit it. This is stricter than machinery space rules, which do have conditions for inside special areas." },
  { id:"ma20", type:"mc",
    q:"When discharging tanker cargo residues outside a special area, what is the minimum required distance from the nearest land?",
    correct:"More than 50 nautical miles",
    options:["More than 12 nautical miles","More than 25 nautical miles","More than 50 nautical miles","More than 100 nautical miles"] },
  { id:"ma21", type:"mc",
    q:"What is the maximum instantaneous rate of discharge for oil tanker cargo residues?",
    correct:"30 litres per nautical mile",
    options:["15 litres per nautical mile","30 litres per nautical mile","60 litres per nautical mile","100 litres per nautical mile"] },
  { id:"ma22", type:"mc",
    q:"The total quantity of cargo residues discharged must not exceed what fraction of the total cargo carried?",
    correct:"1/30,000",
    options:["1/3,000","1/15,000","1/30,000","1/60,000"] },
  { id:"ma23", type:"sort",
    q:"Sort these discharge conditions — MACHINERY SPACE bilge discharge, or TANKER CARGO AREA discharge?",
    categories:["Machinery space","Tanker cargo area"],
    items:[
      { text:"Ship proceeding enroute", cat:"Machinery space" },
      { text:"Effluent does not exceed 15ppm", cat:"Machinery space" },
      { text:"Passes through approved oil filtering equipment", cat:"Machinery space" },
      { text:"More than 50nm from nearest land", cat:"Tanker cargo area" },
      { text:"Instantaneous rate ≤ 30 litres per nautical mile", cat:"Tanker cargo area" },
      { text:"Total quantity ≤ 1/30,000 of total cargo", cat:"Tanker cargo area" },
    ] },
  // OIL RECORD BOOK PART 1
  { id:"ma24", type:"mc",
    q:"Oil Record Book Part 1 (machinery space operations) is required on oil tankers of what minimum gross tonnage?",
    correct:"150 GT and above",
    options:["100 GT and above","150 GT and above","300 GT and above","400 GT and above"] },
  { id:"ma25", type:"mc",
    q:"Oil Record Book Part 1 is required on ships other than oil tankers of what minimum gross tonnage?",
    correct:"400 GT and above",
    options:["150 GT and above","250 GT and above","400 GT and above","500 GT and above"] },
  { id:"ma26", type:"mc",
    q:"A general cargo ship of 600 GT — which Oil Record Books is it required to carry?",
    correct:"ORB Part 1 only",
    options:["ORB Part 1 only","ORB Part 2 only","Both ORB Part 1 and ORB Part 2","None — ORBs are only required on tankers"] },
  { id:"ma27", type:"select-all",
    q:"Select ALL operations that must be recorded in Oil Record Book Part 1:",
    correct:[
      "Ballasting or cleaning of oil fuel tanks",
      "Discharge of dirty ballast or cleaning water from oil fuel tanks",
      "Collection and disposal of oil residues (sludge)",
      "Discharge overboard of bilge water from machinery spaces",
      "Bunkering of fuel or bulk lubricating oil",
    ],
    options:[
      "Ballasting or cleaning of oil fuel tanks",
      "Loading of oil cargo",
      "Discharge of dirty ballast or cleaning water from oil fuel tanks",
      "Crude oil washing of cargo tanks",
      "Collection and disposal of oil residues (sludge)",
      "Ballasting of cargo tanks",
      "Discharge overboard of bilge water from machinery spaces",
      "Discharge of water from slop tanks",
      "Bunkering of fuel or bulk lubricating oil",
    ] },
  // OIL RECORD BOOK PART 2
  { id:"ma28", type:"mc",
    q:"Oil Record Book Part 2 (cargo/ballast operations) is required on oil tankers of what minimum gross tonnage?",
    correct:"150 GT and above",
    options:["100 GT and above","150 GT and above","300 GT and above","400 GT and above"] },
  { id:"ma29", type:"mc",
    q:"An oil tanker of 200 GT — which Oil Record Books is it required to carry?",
    correct:"Both ORB Part 1 and ORB Part 2",
    options:["ORB Part 1 only","ORB Part 2 only","Both ORB Part 1 and ORB Part 2","Neither — it is below the threshold for both"] },
  { id:"ma30", type:"mc",
    q:"Which ballast operation does NOT need to be recorded in Oil Record Book Part 2?",
    correct:"Discharge of ballast from segregated ballast tanks",
    options:[
      "Ballasting of cargo tanks",
      "Discharge of ballast from segregated ballast tanks",
      "Ballasting of dedicated clean ballast tanks",
      "Discharge of water from slop tanks",
    ] },
  { id:"ma31", type:"mc",
    q:"How many Oil Record Book Part 2 entries does a slop tank discharge generate, and what are they?",
    correct:"Two — discharge of water from slop tanks, then closing of all applicable valves",
    options:[
      "One — the discharge event only",
      "Two — discharge of water from slop tanks, then closing of all applicable valves",
      "Two — pump start and pump stop events",
      "Three — start, discharge volume, and completion report",
    ] },
  { id:"ma32", type:"sort",
    q:"Sort these operations into the correct Oil Record Book:",
    categories:["ORB Part 1","ORB Part 2"],
    items:[
      { text:"Bunkering of fuel or bulk lubricating oil", cat:"ORB Part 1" },
      { text:"Collection and disposal of sludge", cat:"ORB Part 1" },
      { text:"Discharge of dirty ballast from oil fuel tanks", cat:"ORB Part 1" },
      { text:"Discharge of bilge water from machinery spaces", cat:"ORB Part 1" },
      { text:"Loading of oil cargo", cat:"ORB Part 2" },
      { text:"Internal transfer of oil cargo during voyage", cat:"ORB Part 2" },
      { text:"Crude oil washing of cargo tanks", cat:"ORB Part 2" },
      { text:"Disposal of cargo residues", cat:"ORB Part 2" },
    ] },
  { id:"ma33", type:"select-all",
    q:"Select ALL operations that must be recorded in Oil Record Book Part 2:",
    correct:[
      "Loading of oil cargo",
      "Internal transfer of oil cargo during voyage",
      "Unloading of oil cargo",
      "Ballasting of cargo tanks and dedicated clean ballast tanks",
      "Cleaning of cargo tanks including crude oil washing",
      "Discharge of ballast except from segregated ballast tanks",
      "Discharge of water from slop tanks",
      "Closing of all applicable valves after slop tank discharge",
      "Disposal of residues",
    ],
    options:[
      "Loading of oil cargo",
      "Bunkering of fuel oil",
      "Internal transfer of oil cargo during voyage",
      "Collection and disposal of sludge",
      "Unloading of oil cargo",
      "Discharge of bilge water from machinery spaces",
      "Ballasting of cargo tanks and dedicated clean ballast tanks",
      "Cleaning of cargo tanks including crude oil washing",
      "Discharge of ballast except from segregated ballast tanks",
      "Discharge of water from slop tanks",
      "Closing of all applicable valves after slop tank discharge",
      "Disposal of residues",
    ] },
];
// Shuffle options/items once at module load so correct answers aren't predictably positioned
(function shuffleMarpolOptions() {
  function fy(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } }
  MARPOL_ANNEX1.forEach(item => {
    if (item.options) fy(item.options);   // mc, multi, select-all
    if (item.items)   fy(item.items);     // sort
  });
})();

// ─── IALA BUOYAGE ─────────────────────────────────────────────────────────────
const IALA_OPTIONS = {
  shape:        ["Can / Cylindrical","Conical","Spherical","Pillar","Spar","Any shape"],
  colour:       ["Red","Green","Yellow","Black over Yellow","Yellow over Black","Black–Yellow–Black bands","Yellow–Black–Yellow bands","Black with Red band(s)","Red & White vertical stripes"],
  lightColour:  ["Red","Green","White","Yellow"],
  lightPattern: ["Any rhythm","Q (continuous)","VQ (continuous)","Q(3) 10s","VQ(3) 5s","Q(6) + LFl 15s","VQ(6) + LFl 10s","Q(9) 15s","VQ(9) 10s","Fl(2)","Fl(2+1)","Iso","Oc","LFl 10s","Mo(A)"],
  topMark:      ["Single cylinder","Single cone (point up)","2 cones — points up ▲▲","2 cones — points down ▼▼","2 cones — base to base ◆","2 cones — point to point ◇","2 black spheres","Single red sphere","Yellow X (saltire)"],
};
const IALA_CAT_LABELS = { shape:"Shape", colour:"Body Colour", lightColour:"Light Colour", lightPattern:"Light Pattern", topMark:"Top Mark" };
const IALA_BUOYAGE = [
  { id:"iala1",  q:"IALA Region A — Port Lateral Mark",      correct:{ shape:["Can / Cylindrical"], colour:["Red"],                       lightColour:["Red"],   lightPattern:["Any rhythm"],                              topMark:["Single cylinder"]             } },
  { id:"iala2",  q:"IALA Region A — Starboard Lateral Mark", correct:{ shape:["Conical"],           colour:["Green"],                     lightColour:["Green"], lightPattern:["Any rhythm"],                              topMark:["Single cone (point up)"]      } },
  { id:"iala3",  q:"IALA Region B — Port Lateral Mark",      correct:{ shape:["Can / Cylindrical"], colour:["Green"],                     lightColour:["Green"], lightPattern:["Any rhythm"],                              topMark:["Single cylinder"]             } },
  { id:"iala4",  q:"IALA Region B — Starboard Lateral Mark", correct:{ shape:["Conical"],           colour:["Red"],                       lightColour:["Red"],   lightPattern:["Any rhythm"],                              topMark:["Single cone (point up)"]      } },
  { id:"iala5",  q:"North Cardinal Mark",                    correct:{ shape:["Pillar","Spar"],      colour:["Black over Yellow"],         lightColour:["White"], lightPattern:["Q (continuous)","VQ (continuous)"],         topMark:["2 cones — points up ▲▲"]     } },
  { id:"iala6",  q:"South Cardinal Mark",                    correct:{ shape:["Pillar","Spar"],      colour:["Yellow over Black"],         lightColour:["White"], lightPattern:["Q(6) + LFl 15s","VQ(6) + LFl 10s"],       topMark:["2 cones — points down ▼▼"]   } },
  { id:"iala7",  q:"East Cardinal Mark",                     correct:{ shape:["Pillar","Spar"],      colour:["Black–Yellow–Black bands"],  lightColour:["White"], lightPattern:["Q(3) 10s","VQ(3) 5s"],                    topMark:["2 cones — base to base ◆"]   } },
  { id:"iala8",  q:"West Cardinal Mark",                     correct:{ shape:["Pillar","Spar"],      colour:["Yellow–Black–Yellow bands"], lightColour:["White"], lightPattern:["Q(9) 15s","VQ(9) 10s"],                   topMark:["2 cones — point to point ◇"] } },
  { id:"iala9",  q:"Isolated Danger Mark",                   correct:{ shape:["Pillar","Spar"],      colour:["Black with Red band(s)"],    lightColour:["White"], lightPattern:["Fl(2)"],                                   topMark:["2 black spheres"]             } },
  { id:"iala10", q:"Safe Water Mark",                        correct:{ shape:["Spherical","Pillar","Spar"], colour:["Red & White vertical stripes"], lightColour:["White"], lightPattern:["Iso","Oc","LFl 10s","Mo(A)"], topMark:["Single red sphere"]      } },
  { id:"iala11", q:"Special Mark",                           correct:{ shape:["Any shape"],          colour:["Yellow"],                    lightColour:["Yellow"], lightPattern:["Any rhythm"],                             topMark:["Yellow X (saltire)"]          } },
];

function getQuizData(id) {
  if (id === "imdg")          return IMDG_CLASSES;
  if (id === "solas")         return SOLAS_CHAPTERS;
  if (id === "solas-numbers") return SOLAS_NUMBERS_QUIZ;
  if (id === "pilot")         return PILOT_LADDER_QUIZ;
  if (id === "marpol")        return MARPOL_ANNEX1;
  if (id === "iala-buoyage")  return IALA_BUOYAGE;
  return [];
}

const QUIZ_CONFIG = {
  imdg:           { label:"IMDG CLASS",     question:"What is this class called?",   placeholder:"Type the class name…",    backLabel:"← IMDG",   doneText:"All classes nailed!",       type:"text"   },
  solas:          { label:"SOLAS CHAPTER",  question:"What is this chapter called?",  placeholder:"Type the chapter title…", backLabel:"← SOLAS",  doneText:"All chapters nailed!",      type:"text"   },
  "solas-numbers":{ label:"SOLAS CHAPTER",  question:"",                              placeholder:"",                        backLabel:"← SOLAS",  doneText:"All chapters matched!",     type:"mc"     },
  pilot:          { label:"PILOT LADDER",   question:"",                              placeholder:"",                        backLabel:"← PILOT",  doneText:"All questions nailed!",     type:"mc"     },
  marpol:         { label:"MARPOL ANNEX 1", question:"",                              placeholder:"",                        backLabel:"← MARPOL", doneText:"MARPOL Annex 1 complete!",  type:"marpol" },
  "iala-buoyage": { label:"IALA BUOYAGE",   question:"",                              placeholder:"",                        backLabel:"← Buoyage", doneText:"IALA Buoyage complete!",    type:"buoy"   },
};

const PART_A_QUIZZES = [
  // ── SOLAS
  { id:"solas",         title:"SOLAS Chapter Titles",      count:17, icon:"⚓",  desc:"Name each SOLAS chapter from its roman numeral" },
  { id:"solas-numbers", title:"SOLAS Numbers Game",        count:17, icon:"🔢", desc:"Match each chapter title to its roman numeral" },
  // ── MARPOL
  { id:"marpol",        title:"MARPOL Annex I — Oil",      count:33, icon:"🛢️", desc:"Definitions, special areas, discharge conditions, and Oil Record Books" },
  { id:"marpol-4",      title:"MARPOL Annex IV — Sewage",  count:0,  icon:"🚽", desc:"Sewage discharge requirements and special areas", comingSoon:true },
  { id:"marpol-5",      title:"MARPOL Annex V — Garbage",  count:0,  icon:"🗑️", desc:"Garbage management plans, placards, and discharge rules", comingSoon:true },
  // ── Cargo & Safety
  { id:"imdg",          title:"IMDG Classes",              count:18, icon:"☢️",  desc:"Name each IMDG dangerous goods class from its number" },
  // ── Practical & Navigation
  { id:"pilot",         title:"IMPA Pilot Ladder",         count:20, icon:"🪜", desc:"Multiple choice questions on pilot ladder regulations" },
  { id:"iala-buoyage",  title:"IALA Buoyage",              count:11, icon:"🚢", desc:"Identify shape, colour, light pattern and top mark for all IALA marks", comingSoon:true },
];

function QuizProgressWheel({ pct, size = 52 }) {
  const strokeW = 4;
  const r = (size - strokeW) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  const color = pct >= 80 ? "var(--confident)" : pct >= 50 ? "var(--review)" : "#ef4444";
  return (
    <div style={{ position:"relative", width:size, height:size }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border)" strokeWidth={strokeW}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeW}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition:"stroke-dashoffset 0.5s ease" }}/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"10px", fontWeight:700, fontFamily:"'Space Mono',monospace", color }}>
        {pct}%
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  const [selectedCats, setSelectedCats] = useState([]);
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [showTip, setShowTip] = useState(false);
  const [showRelated, setShowRelated] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [expandedTheme, setExpandedTheme] = useState(null);
  const [dailyQ, setDailyQ] = useState(null);
  const [showDaily, setShowDaily] = useState(true);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("oow-theme") || "light"; } catch { return "light"; }
  });
  const [showNotes, setShowNotes] = useState(() => typeof window !== "undefined" && window.innerWidth >= 1024);
  const [noteText, setNoteText] = useState("");
  const [allNotes, setAllNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("oow-notes") || "{}"); } catch { return {}; }
  });
  const [allTags, setAllTags] = useState(() => {
    try { return JSON.parse(localStorage.getItem("oow-tags") || "{}"); } catch { return {}; }
  });
  const [confidenceFilter, setConfidenceFilter] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState({ topics: false, shortcuts: true });
  const [viewKey, setViewKey] = useState(0);
  const [allBookmarks, setAllBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("oow-bookmarks") || "{}"); } catch { return {}; }
  });
  const [practiceHistory, setPracticeHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("oow-history") || "[]"); } catch { return []; }
  });
  const [examQuestions, setExamQuestions] = useState([]);
  const [examIdx, setExamIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState([]);
  const [examTimeLeft, setExamTimeLeft] = useState(null);
  const [examStartTime, setExamStartTime] = useState(null);
  const [examFinished, setExamFinished] = useState(false);
  const [expandedReviewIdx, setExpandedReviewIdx] = useState(null);
  const examTimerRef = useRef(null);
  const examCardRef = useRef(null);
  const cardRef = useRef(null);
  const saveTimerRef = useRef(null);
  // Part A quiz states
  const [quizId, setQuizId] = useState(null);
  const [quizMode, setQuizMode] = useState("ordered");
  const [quizOrder, setQuizOrder] = useState([]);
  const [quizPos, setQuizPos] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState(null); // null | "correct" | "incorrect"
  const [quizScore, setQuizScore] = useState({ correct:0, total:0 });
  const [quizDone, setQuizDone] = useState(false);
  const quizInputRef = useRef(null);
  const [quizSelectedId, setQuizSelectedId] = useState(PART_A_QUIZZES[0].id);
  const [quizSelectedMode, setQuizSelectedMode] = useState("ordered");
  const quizFeedbackTimeRef = useRef(0);
  const [quizHistory, setQuizHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("oow-quiz-history") || "{}"); } catch { return {}; }
  });
  const [showPoster, setShowPoster] = useState(false);
  const [showHint, setShowHint] = useState(false);
  // IALA Buoyage state
  const EMPTY_BUOY_SEL = { shape:[], colour:[], lightColour:[], lightPattern:[], topMark:[] };
  const [buoySelected, setBuoySelected] = useState(EMPTY_BUOY_SEL);
  const [buoyFeedback, setBuoyFeedback] = useState(null);
  const [buoyScore, setBuoyScore] = useState({ correct:0, total:0 });
  const buoyScoreRef = useRef({ correct:0, total:0 });
  // MARPOL-specific state
  const [marpolFlipped, setMarpolFlipped] = useState(false);
  const [marpolSelected, setMarpolSelected] = useState([]);
  const [marpolSortState, setMarpolSortState] = useState({});
  const [marpolFeedback, setMarpolFeedback] = useState(null);
  const [marpolScore, setMarpolScore] = useState({ correct:0, total:0 });
  const marpolScoreRef = useRef({ correct:0, total:0 });
  const marpolFeedbackTimeRef = useRef(0);

  const noteKey = useCallback((question) => {
    // Create a stable key from category + question text
    return (question.cat + "::" + question.q).substring(0, 120);
  }, []);

  const saveNote = useCallback((key, text) => {
    setAllNotes(prev => {
      const next = { ...prev };
      if (text.trim()) next[key] = text;
      else delete next[key];
      try { localStorage.setItem("oow-notes", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const saveTag = useCallback((key, tag) => {
    setAllTags(prev => {
      const next = { ...prev };
      if (tag) next[key] = tag; else delete next[key];
      try { localStorage.setItem("oow-tags", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggleTag = useCallback((question, tag) => {
    const key = noteKey(question);
    const current = allTags[key];
    saveTag(key, current === tag ? null : tag);
  }, [noteKey, allTags, saveTag]);

  const toggleBookmark = useCallback((question) => {
    const key = noteKey(question);
    setAllBookmarks(prev => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      try { localStorage.setItem("oow-bookmarks", JSON.stringify(next)); } catch {}
      return next;
    });
  }, [noteKey]);

  const handleNoteChange = useCallback((e) => {
    const val = e.target.value;
    setNoteText(val);
    // Debounced save
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      const q = pool[idx];
      if (q) saveNote(noteKey(q), val);
    }, 400);
  }, [pool, idx, saveNote, noteKey]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === "dark" ? "light" : "dark";
      try { localStorage.setItem("oow-theme", next); } catch {}
      return next;
    });
  }, []);

  const categories = Object.keys(QUESTIONS).sort((a, b) =>
    QUESTIONS[b].length - QUESTIONS[a].length
  );
  const totalQuestions = Object.values(QUESTIONS).reduce((s, v) => s + v.length, 0);

  // Generate a "daily" random question on first load
  useState(() => {
    const allQs = [];
    Object.entries(QUESTIONS).forEach(([cat, qs]) =>
      qs.forEach((q) => allQs.push({ ...q, cat }))
    );
    const seed = new Date().toDateString();
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
    const picked = allQs[Math.abs(hash) % allQs.length];
    setDailyQ(picked);
  });

  const changeView = useCallback((v) => {
    setViewKey(k => k + 1);
    setView(v);
  }, []);

  // ── Part A quiz handlers ──
  const startQuiz = useCallback((id, mode) => {
    const data = getQuizData(id);
    const indices = [...Array(data.length).keys()];
    const order = mode === "random"
      ? indices.sort(() => Math.random() - 0.5)
      : indices;
    setQuizId(id);
    setQuizMode(mode);
    setQuizOrder(order);
    setQuizPos(0);
    setQuizAnswer("");
    setQuizFeedback(null);
    setQuizScore({ correct:0, total:0 });
    setQuizDone(false);
    setShowPoster(false);
    setBuoySelected({ shape:[], colour:[], lightColour:[], lightPattern:[], topMark:[] });
    setBuoyFeedback(null);
    setBuoyScore({ correct:0, total:0 });
    buoyScoreRef.current = { correct:0, total:0 };
    setMarpolFlipped(false);
    setMarpolSelected([]);
    setMarpolSortState({});
    setMarpolFeedback(null);
    setMarpolScore({ correct:0, total:0 });
    marpolScoreRef.current = { correct:0, total:0 };
    setViewKey(k => k + 1);
    setView("part-a-quiz");
    setTimeout(() => quizInputRef.current?.focus(), 150);
  }, []);

  const submitQuizAnswer = useCallback(() => {
    if (!quizAnswer.trim() || quizFeedback) return;
    const data = getQuizData(quizId);
    const item = data[quizOrder[quizPos]];
    const normalise = s => s.trim().toLowerCase()
      .replace(/\s*\([^)]*\)/g, "")   // strip parenthetical notes e.g. "(GMDSS)"
      .replace(/[;,–\-]/g, " ")
      .replace(/\s+/g, " ").trim();
    const isCorrect = normalise(quizAnswer) === normalise(item.name);
    quizFeedbackTimeRef.current = Date.now();
    setQuizFeedback(isCorrect ? "correct" : "incorrect");
    setQuizScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
  }, [quizAnswer, quizFeedback, quizId, quizOrder, quizPos]);

  const nextQuizQuestion = useCallback(() => {
    if (Date.now() - quizFeedbackTimeRef.current < 400) return;
    if (quizPos + 1 >= quizOrder.length) {
      setQuizDone(true);
      setQuizHistory(prev => {
        const updated = { ...prev, [quizId]: { correct: quizScore.correct, total: quizScore.total } };
        localStorage.setItem("oow-quiz-history", JSON.stringify(updated));
        return updated;
      });
      return;
    }
    setQuizPos(p => p + 1);
    setQuizAnswer("");
    setQuizFeedback(null);
    setShowHint(false);
    setTimeout(() => quizInputRef.current?.focus(), 80);
  }, [quizPos, quizOrder, quizId, quizScore]);

  const selectMCOption = useCallback((optionText) => {
    if (quizFeedback) return;
    const data = getQuizData(quizId);
    const item = data[quizOrder[quizPos]];
    const isCorrect = optionText === item.correct;
    quizFeedbackTimeRef.current = Date.now();
    setQuizAnswer(optionText);
    setQuizFeedback(isCorrect ? "correct" : "incorrect");
    setQuizScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
  }, [quizFeedback, quizId, quizOrder, quizPos]);

  // ── MARPOL quiz handlers ──
  const marpolRecordScore = (isCorrect) => {
    setMarpolScore(s => {
      const next = { correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 };
      marpolScoreRef.current = next;
      return next;
    });
  };

  const marpolNext = useCallback(() => {
    if (Date.now() - marpolFeedbackTimeRef.current < 400) return;
    const nextPos = quizPos + 1;
    if (nextPos >= quizOrder.length) {
      setQuizDone(true);
      setQuizHistory(prev => {
        const sc = marpolScoreRef.current;
        const updated = { ...prev, marpol: { correct: sc.correct, total: sc.total } };
        try { localStorage.setItem("oow-quiz-history", JSON.stringify(updated)); } catch {}
        return updated;
      });
      return;
    }
    setQuizPos(nextPos);
    setMarpolFlipped(false);
    setMarpolSelected([]);
    setMarpolSortState({});
    setMarpolFeedback(null);
  }, [quizPos, quizOrder]);

  // ── IALA Buoyage handlers ──
  const buoyToggle = useCallback((cat, opt) => {
    if (buoyFeedback) return;
    setBuoySelected(p => ({ ...p, [cat]: p[cat].includes(opt) ? p[cat].filter(x => x !== opt) : [...p[cat], opt] }));
  }, [buoyFeedback]);

  const buoySubmit = useCallback(() => {
    const item = IALA_BUOYAGE[quizOrder[quizPos]];
    const isCorrect = Object.keys(item.correct).every(cat => {
      const cSet = new Set(item.correct[cat]);
      const sArr = buoySelected[cat] || [];
      return sArr.length === cSet.size && sArr.every(x => cSet.has(x));
    });
    buoyScoreRef.current = { correct: buoyScoreRef.current.correct + (isCorrect ? 1 : 0), total: buoyScoreRef.current.total + 1 };
    setBuoyScore({ ...buoyScoreRef.current });
    setBuoyFeedback(isCorrect ? "correct" : "incorrect");
  }, [buoySelected, quizOrder, quizPos]);

  const buoyNext = useCallback(() => {
    const nextPos = quizPos + 1;
    if (nextPos >= quizOrder.length) {
      setQuizDone(true);
      setQuizHistory(prev => {
        const sc = buoyScoreRef.current;
        const updated = { ...prev, "iala-buoyage": { correct: sc.correct, total: sc.total } };
        try { localStorage.setItem("oow-quiz-history", JSON.stringify(updated)); } catch {}
        return updated;
      });
      return;
    }
    setQuizPos(nextPos);
    setBuoySelected({ shape:[], colour:[], lightColour:[], lightPattern:[], topMark:[] });
    setBuoyFeedback(null);
  }, [quizPos, quizOrder]);

  const marpolSelectMC = useCallback((opt) => {
    if (marpolFeedback) return;
    const item = MARPOL_ANNEX1[quizOrder[quizPos]];
    const isCorrect = opt === item.correct;
    marpolFeedbackTimeRef.current = Date.now();
    setMarpolSelected([opt]);
    setMarpolFeedback(isCorrect ? "correct" : "incorrect");
    marpolRecordScore(isCorrect);
  }, [marpolFeedback, quizOrder, quizPos]);

  const marpolSelectTF = useCallback((label, val) => {
    if (marpolFeedback) return;
    const item = MARPOL_ANNEX1[quizOrder[quizPos]];
    const isCorrect = val === item.correct;
    marpolFeedbackTimeRef.current = Date.now();
    setMarpolSelected([label]);
    setMarpolFeedback(isCorrect ? "correct" : "incorrect");
    marpolRecordScore(isCorrect);
  }, [marpolFeedback, quizOrder, quizPos]);

  const marpolSubmitMulti = useCallback(() => {
    const item = MARPOL_ANNEX1[quizOrder[quizPos]];
    const cSet = new Set(item.correct);
    const isCorrect = marpolSelected.length === item.correct.length && marpolSelected.every(s => cSet.has(s));
    marpolFeedbackTimeRef.current = Date.now();
    setMarpolFeedback(isCorrect ? "correct" : "incorrect");
    marpolRecordScore(isCorrect);
  }, [marpolSelected, quizOrder, quizPos]);

  const marpolSubmitSelectAll = useCallback(() => {
    const item = MARPOL_ANNEX1[quizOrder[quizPos]];
    const cSet = new Set(item.correct);
    const isCorrect = marpolSelected.length === item.correct.length && marpolSelected.every(s => cSet.has(s));
    marpolFeedbackTimeRef.current = Date.now();
    setMarpolFeedback(isCorrect ? "correct" : "incorrect");
    marpolRecordScore(isCorrect);
  }, [marpolSelected, quizOrder, quizPos]);

  const marpolSubmitSort = useCallback(() => {
    const item = MARPOL_ANNEX1[quizOrder[quizPos]];
    const isCorrect = item.items.every((it, i) => marpolSortState[i] === it.cat);
    marpolFeedbackTimeRef.current = Date.now();
    setMarpolFeedback(isCorrect ? "correct" : "incorrect");
    marpolRecordScore(isCorrect);
  }, [marpolSortState, quizOrder, quizPos]);

  const toggleCat = (cat) =>
    setSelectedCats((p) => p.includes(cat) ? p.filter((c) => c !== cat) : [...p, cat]);

  const loadNoteForQuestion = useCallback((question) => {
    const key = noteKey(question);
    setNoteText(allNotes[key] || "");
  }, [allNotes, noteKey]);

  const startPractice = useCallback(() => {
    const cats = selectedCats.length > 0 ? selectedCats : categories;
    let items = [];
    cats.forEach((cat) => QUESTIONS[cat].forEach((q) => items.push({ ...q, cat })));
    // Filter by confidence if set
    if (confidenceFilter !== "all") {
      items = items.filter(q => {
        const key = noteKey(q);
        const tag = allTags[key];
        if (confidenceFilter === "review") return tag === "review";
        if (confidenceFilter === "confident") return tag === "confident";
        if (confidenceFilter === "untagged") return !tag;
        if (confidenceFilter === "bookmarked") return !!allBookmarks[noteKey(q)];
        return true;
      });
    }
    items = shuffle(items);
    setPool(items);
    setIdx(0);
    setShowNotes(typeof window !== "undefined" && window.innerWidth >= 1024);
    changeView("practice");
    if (items[0]) loadNoteForQuestion(items[0]);
  }, [selectedCats, categories, loadNoteForQuestion, confidenceFilter, allTags, allBookmarks, noteKey, changeView]);

  const recordSession = useCallback(() => {
    if (pool.length === 0) return;
    const today = new Date().toISOString().split("T")[0];
    const sessionCats = [...new Set(pool.map(p => p.cat))];
    const entry = { date: today, questionsCount: idx + 1, categories: sessionCats };
    setPracticeHistory(prev => {
      const next = [...prev, entry].slice(-500);
      try { localStorage.setItem("oow-history", JSON.stringify(next)); } catch {}
      return next;
    });
  }, [pool, idx]);

  const drillWeakSpots = useCallback(() => {
    const cats = selectedCats.length > 0 ? selectedCats : categories;
    let items = [];
    cats.forEach(cat => QUESTIONS[cat].forEach(q => items.push({ ...q, cat })));
    items = items.filter(q => allTags[noteKey(q)] === "review");
    items = shuffle(items);
    if (items.length === 0) return;
    setPool(items);
    setIdx(0);
    setShowNotes(typeof window !== "undefined" && window.innerWidth >= 1024);
    changeView("practice");
    if (items[0]) loadNoteForQuestion(items[0]);
  }, [selectedCats, categories, allTags, noteKey, loadNoteForQuestion, changeView]);

  const formatExamTime = (seconds) => {
    if (seconds == null) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const animateExamCard = useCallback(() => {
    if (examCardRef.current) {
      examCardRef.current.style.animation = "none";
      examCardRef.current.offsetHeight;
      examCardRef.current.style.animation = "examSlideIn 0.35s cubic-bezier(0.22,1,0.36,1)";
    }
  }, []);

  const finishExam = useCallback(() => {
    if (examTimerRef.current) clearInterval(examTimerRef.current);
    setExamFinished(true);
    const today = new Date().toISOString().split("T")[0];
    const sessionCats = [...new Set(examQuestions.map(q => q.cat))];
    setPracticeHistory(prev => {
      const next = [...prev, { date: today, questionsCount: examIdx + 1, categories: sessionCats, type: "exam" }].slice(-500);
      try { localStorage.setItem("oow-history", JSON.stringify(next)); } catch {}
      return next;
    });
    changeView("exam-results");
  }, [examQuestions, examIdx, changeView]);

  const examNext = useCallback(() => {
    const isLast = examIdx >= examQuestions.length - 1;
    if (isLast) { finishExam(); return; }

    const currentQ = examQuestions[examIdx];
    // Follow-on: 25% chance, never chain follow-ons, not near end
    if (!currentQ.isFollowOn && Math.random() < 0.25 && examIdx < examQuestions.length - 3) {
      const usedQs = new Set(examQuestions.map(eq => eq.q));
      const relatedCats = RELATED_TOPICS[currentQ.cat] || [];
      const sameCat = (QUESTIONS[currentQ.cat] || []).filter(q => !usedQs.has(q.q)).map(q => ({ ...q, cat: currentQ.cat }));
      const relCat = relatedCats.flatMap(c => (QUESTIONS[c] || []).filter(q => !usedQs.has(q.q)).map(q => ({ ...q, cat: c })));
      const candidates = (Math.random() < 0.6 && sameCat.length > 0) ? sameCat : relCat;
      if (candidates.length > 0) {
        const picked = candidates[Math.floor(Math.random() * candidates.length)];
        const followOn = { ...picked, isFollowOn: true, followOnParentIdx: examIdx };
        setExamQuestions(prev => [...prev.slice(0, examIdx + 1), followOn, ...prev.slice(examIdx + 1)]);
        setExamAnswers(prev => [...prev.slice(0, examIdx + 1), { confidence: null }, ...prev.slice(examIdx + 1)]);
      }
    }

    setExamIdx(prev => prev + 1);
    animateExamCard();
  }, [examQuestions, examIdx, finishExam, animateExamCard]);

  const startExam = useCallback(() => {
    const pool = buildExamPool(20);
    setExamQuestions(pool);
    setExamIdx(0);
    setExamAnswers(pool.map(() => ({ confidence: null })));
    setExamTimeLeft(1800);
    setExamStartTime(Date.now());
    setExamFinished(false);
    setExpandedReviewIdx(null);
    changeView("exam");
  }, [changeView]);

  const practiceWeakFromExam = useCallback(() => {
    // Find categories where user was unsure/no-idea more than confident
    const topicConf = {};
    examQuestions.forEach((q, i) => {
      if (i > examIdx) return;
      if (!topicConf[q.cat]) topicConf[q.cat] = { good: 0, bad: 0 };
      const a = examAnswers[i];
      if (a?.confidence === "confident") topicConf[q.cat].good++;
      else if (a?.confidence) topicConf[q.cat].bad++;
    });
    const weakCats = Object.entries(topicConf).filter(([, s]) => s.bad >= s.good).map(([c]) => c);
    if (weakCats.length === 0) { changeView("home"); return; }
    let items = [];
    weakCats.forEach(cat => (QUESTIONS[cat] || []).forEach(q => items.push({ ...q, cat })));
    items = shuffle(items);
    if (items.length === 0) { changeView("home"); return; }
    setPool(items); setIdx(0);
    setShowNotes(typeof window !== "undefined" && window.innerWidth >= 1024);
    changeView("practice");
    if (items[0]) loadNoteForQuestion(items[0]);
  }, [examQuestions, examIdx, examAnswers, changeView, loadNoteForQuestion]);

  // Find related questions from adjacent topics using keyword relevance
  const getRelatedQuestions = useCallback((question, count = 3) => {
    if (!question) return [];
    const relatedCats = RELATED_TOPICS[question.cat] || [];
    if (relatedCats.length === 0) return [];
    // Extract keywords from current question (3+ chars, excluding common words)
    const stopWords = new Set(["the","and","for","are","what","how","you","your","with","that","this","from","which","would","does","have","been","when","where","they","will","about","into","than","also","should","could","there"]);
    const words = question.q.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => w.length >= 3 && !stopWords.has(w));
    const keywordSet = new Set(words);
    // Gather candidates from related categories
    let candidates = [];
    relatedCats.forEach(cat => {
      const qs = QUESTIONS[cat];
      if (!qs) return;
      qs.forEach(q => {
        const qWords = q.q.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/);
        let score = 1; // base score for being in a related topic
        qWords.forEach(w => { if (keywordSet.has(w)) score += 2; });
        candidates.push({ ...q, cat, score });
      });
    });
    // Sort by relevance score, take top N, deduplicate by category for variety
    candidates.sort((a, b) => b.score - a.score);
    const result = [];
    const usedCats = new Set();
    for (const c of candidates) {
      if (result.length >= count) break;
      // Prefer variety across categories
      if (result.length < count - 1 && usedCats.has(c.cat) && candidates.some(x => !usedCats.has(x.cat) && !result.includes(x))) continue;
      result.push(c);
      usedCats.add(c.cat);
    }
    return result;
  }, []);

  const animateCard = () => {
    if (cardRef.current) {
      cardRef.current.style.animation = "none";
      cardRef.current.offsetHeight;
      cardRef.current.style.animation = "slideIn 0.3s cubic-bezier(0.22,1,0.36,1)";
    }
  };

  const next = useCallback(() => {
    setShowTip(false);
    setShowRelated(false);
    let nextIdx, nextPool = pool;
    if (idx + 1 < pool.length) { nextIdx = idx + 1; }
    else { nextPool = shuffle(pool); nextIdx = 0; setPool(nextPool); }
    setIdx(nextIdx);
    loadNoteForQuestion(nextPool[nextIdx]);
    animateCard();
  }, [pool, idx, loadNoteForQuestion]);

  const prev = useCallback(() => {
    setShowTip(false);
    setShowRelated(false);
    if (idx > 0) {
      setIdx(idx - 1);
      loadNoteForQuestion(pool[idx - 1]);
      animateCard();
    }
  }, [idx, pool, loadNoteForQuestion]);

  // Keyboard shortcuts for practice view
  useEffect(() => {
    if (view !== "practice") return;
    const handler = (e) => {
      if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;
      switch (e.key) {
        case "ArrowRight": next(); e.preventDefault(); break;
        case "ArrowLeft": prev(); e.preventDefault(); break;
        case "n": case "N": setShowNotes(s => !s); break;
        case "c": case "C": if (pool[idx]) toggleTag(pool[idx], "confident"); break;
        case "r": case "R": if (pool[idx]) toggleTag(pool[idx], "review"); break;
        case "b": case "B": if (pool[idx]) toggleBookmark(pool[idx]); break;
        case " ": setShowTip(s => !s); e.preventDefault(); break;
        case "Escape": recordSession(); changeView("home"); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [view, next, prev, pool, idx, toggleTag, toggleBookmark, recordSession, changeView]);

  // Exam timer
  useEffect(() => {
    if (view !== "exam" || examTimeLeft === null || examFinished) {
      if (examTimerRef.current) clearInterval(examTimerRef.current);
      return;
    }
    examTimerRef.current = setInterval(() => {
      setExamTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(examTimerRef.current);
          setExamFinished(true);
          changeView("exam-results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (examTimerRef.current) clearInterval(examTimerRef.current); };
  }, [view, examFinished, changeView]);

  // Exam keyboard shortcuts
  useEffect(() => {
    if (view !== "exam") return;
    const handler = (e) => {
      switch (e.key) {
        case "ArrowRight": case "Enter": examNext(); e.preventDefault(); break;
        case "1": setExamAnswers(prev => { const n = [...prev]; n[examIdx] = { confidence: "confident" }; return n; }); break;
        case "2": setExamAnswers(prev => { const n = [...prev]; n[examIdx] = { confidence: "unsure" }; return n; }); break;
        case "3": setExamAnswers(prev => { const n = [...prev]; n[examIdx] = { confidence: "no-idea" }; return n; }); break;
        case "Escape": finishExam(); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [view, examNext, examIdx, finishExam]);

  const filteredCategories = categories.filter(
    (c) => c.toLowerCase().includes(filterText.toLowerCase())
  );

  // Compute filtered count considering both category + confidence filters
  const getFilteredCount = () => {
    const cats = selectedCats.length > 0 ? selectedCats : categories;
    let items = [];
    cats.forEach(cat => QUESTIONS[cat]?.forEach(q => items.push({ ...q, cat })));
    if (confidenceFilter !== "all") {
      items = items.filter(q => {
        const key = noteKey(q);
        const tag = allTags[key];
        if (confidenceFilter === "review") return tag === "review";
        if (confidenceFilter === "confident") return tag === "confident";
        if (confidenceFilter === "untagged") return !tag;
        if (confidenceFilter === "bookmarked") return !!allBookmarks[noteKey(q)];
        return true;
      });
    }
    return items.length;
  };
  const selectedCount = getFilteredCount();

  // Confidence stats for display
  const getConfidenceStats = () => {
    const cats = selectedCats.length > 0 ? selectedCats : categories;
    let confident = 0, review = 0, untagged = 0, bookmarked = 0;
    cats.forEach(cat => QUESTIONS[cat]?.forEach(q => {
      const key = noteKey({ ...q, cat });
      const tag = allTags[key];
      if (tag === "confident") confident++;
      else if (tag === "review") review++;
      else untagged++;
      if (allBookmarks[key]) bookmarked++;
    }));
    return { confident, review, untagged, bookmarked };
  };
  const confidenceStats = getConfidenceStats();
  const hasAnyTags = Object.keys(allTags).length > 0;
  const hasAnyBookmarks = Object.keys(allBookmarks).length > 0;

  // Selection summary for quick actions
  const selectionSummary = (() => {
    if (selectedCats.length === 0) return null;
    let total = 0, reviewCount = 0, bookmarkedCount = 0;
    selectedCats.forEach(cat => QUESTIONS[cat]?.forEach(q => {
      total++;
      const key = noteKey({ ...q, cat });
      if (allTags[key] === "review") reviewCount++;
      if (allBookmarks[key]) bookmarkedCount++;
    }));
    return { topicCount: selectedCats.length, total, reviewCount, bookmarkedCount };
  })();

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Space+Mono:wght@400;700&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    :root {
      --bg: #0c1526; --card: #111e33; --card-h: #192d47;
      --border: #1e3350; --t1: #dde8f5; --t2: #6890b0; --t3: #3e6080;
      --accent: #20c0c8; --dot: #dde8f5; --glow-opacity: 0.15;
      --h1-from: #dde8f5; --h1-to: #6890b0;
      --daily-bg-from: #192d47; --daily-bg-to: #0c1526;
      --tip-bg: #f59e0b08; --tip-border: #f59e0b25;
      --confident: #10b981; --confident-bg: #10b98118; --confident-border: #10b981;
      --review: #f59e0b; --review-bg: #f59e0b18; --review-border: #f59e0b;
      --bookmark: #5b8fd4; --bookmark-bg: #5b8fd415; --bookmark-border: #5b8fd440;
      --go-shadow: rgba(32,192,200,0.3);
      --daily-border: #f59e0b40;
      --daily-accent: #f59e0b;
    }
    [data-theme="light"] {
      --bg: #f3f5f2; --card: #ffffff; --card-h: #eef4f3;
      --border: #DBE2DC; --t1: #2a3a35; --t2: #506660; --t3: #74A8A4;
      --accent: #335765; --dot: transparent; --glow-opacity: 0.08;
      --h1-from: #335765; --h1-to: #74A8A4;
      --daily-bg-from: #f0f6f5; --daily-bg-to: #e6efed;
      --tip-bg: #fdfaf3; --tip-border: #d4b21230;
      --confident: #2d8a6e; --confident-bg: #2d8a6e14; --confident-border: #2d8a6e50;
      --review: #d4b212; --review-bg: #d4b21214; --review-border: #d4b21250;
      --bookmark: #74A8A4; --bookmark-bg: #74A8A412; --bookmark-border: #74A8A440;
      --go-shadow: rgba(51,87,101,0.25);
      --daily-border: #d4b21240;
      --daily-accent: #d4b212;
    }
    .dark-pattern {
      display:block; position:fixed; inset:0; z-index:0; opacity:0.09; pointer-events:none;
      background-image: url("data:image/svg+xml,%3Csvg width='28' height='28' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1.5' fill='%2320c0c8'/%3E%3C/svg%3E");
      background-size: 28px 28px;
    }
    [data-theme="light"] .dark-pattern { display:none; }
    .light-pattern { display:none; }
    [data-theme="light"] .light-pattern {
      display:block; position:fixed; inset:0; z-index:0; opacity:0.18;
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0H0v40' fill='none' stroke='%2374A8A4' stroke-width='0.5'/%3E%3Ccircle cx='0' cy='0' r='1' fill='%2374A8A4'/%3E%3C/svg%3E");
      background-size: 40px 40px;
    }
    body { background: var(--bg); transition: background 0.3s; }
    @keyframes slideIn {
      from { opacity:0; transform:translateY(14px); }
      to { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity:0; } to { opacity:1; }
    }
    @keyframes viewEnter {
      from { opacity:0; transform:translateY(24px); }
      to { opacity:1; transform:translateY(0); }
    }
    @keyframes examSetupEnter {
      0% { opacity:0; transform:scale(0.93) translateY(44px); }
      100% { opacity:1; transform:scale(1) translateY(0); }
    }
    .view-enter { animation: viewEnter 0.4s cubic-bezier(0.22,1,0.36,1) both; }
    .exam-setup-container.view-enter { animation: examSetupEnter 0.6s cubic-bezier(0.16,1,0.3,1) both; }

    /* Collapsible sidebar sections */
    .sidebar-header {
      display:flex; align-items:center; justify-content:space-between; cursor:pointer;
      font-family:'Space Mono',monospace; font-size:11px; letter-spacing:2px;
      text-transform:uppercase; color:var(--t3); font-weight:700; user-select:none;
    }
    .sidebar-header:hover { color:var(--t2); }
    .sidebar-chevron { font-size:12px; transition:transform 0.2s; }
    .sidebar-chevron.collapsed { transform:rotate(-90deg); }

    .main-title { background:linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    [data-theme="light"] .main-title { background:linear-gradient(135deg, #335765 0%, #74A8A4 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

    /* Theme toggle */
    .theme-toggle { position:fixed; top:20px; right:20px; z-index:100; display:flex; align-items:center; gap:8px; }
    .theme-toggle-label { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:1px; text-transform:uppercase; color:var(--t3); font-weight:700; }
    .theme-switch { position:relative; width:48px; height:26px; cursor:pointer; }
    .theme-switch input { display:none; }
    .theme-switch .slider { position:absolute; inset:0; background:var(--border); border-radius:13px; transition:all 0.3s; }
    .theme-switch .slider::before { content:''; position:absolute; width:20px; height:20px; left:3px; top:3px; background:var(--t1); border-radius:50%; transition:all 0.3s; }
    .theme-switch input:checked + .slider { background:var(--accent); }
    .theme-switch input:checked + .slider::before { transform:translateX(22px); background:#fff; }

    /* Notes section */
    .notes-section { margin-bottom:24px; }
    .notes-toggle { display:inline-flex; align-items:center; gap:8px; background:var(--card); border:1px solid var(--border); border-radius:8px; padding:8px 14px; cursor:pointer; transition:all 0.15s; font-family:'DM Sans',sans-serif; }
    .notes-toggle:hover { border-color:var(--t3); }
    .notes-toggle .icon { font-size:14px; }
    .notes-toggle .label { font-size:12px; font-weight:600; color:var(--accent); }
    .notes-toggle .has-notes { width:6px; height:6px; border-radius:50%; background:var(--confident); flex-shrink:0; }
    .notes-body { margin-top:12px; animation:fadeIn 0.2s ease; }
    .notes-textarea { width:100%; min-height:120px; max-height:60vh; resize:vertical; background:var(--card); border:1px solid var(--border); border-radius:10px; padding:14px 16px; color:var(--t1); font-size:14px; line-height:1.65; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.15s; }
    .notes-textarea:focus { border-color:var(--accent); }
    .notes-textarea::placeholder { color:var(--t3); }
    .notes-saved { font-family:'Space Mono',monospace; font-size:10px; color:var(--t3); margin-top:6px; text-align:right; letter-spacing:0.5px; }

    /* Confidence tagging */
    .tag-row { display:flex; gap:8px; align-items:center; margin-bottom:24px; }
    .tag-btn { display:inline-flex; align-items:center; gap:6px; padding:7px 14px; border-radius:8px; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; transition:all 0.15s; border:1.5px solid var(--border); background:var(--card); color:var(--t2); }
    .tag-btn:hover { border-color:var(--t3); }
    .tag-btn.active-confident { background:var(--confident-bg); border-color:var(--confident-border); color:var(--confident); }
    .tag-btn.active-review { background:var(--review-bg); border-color:var(--review-border); color:var(--review); }
    .tag-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
    .tag-dot.confident { background:var(--confident); }
    .tag-dot.review { background:var(--review); }
    /* === PART A QUIZ === */
    .quiz-page { min-height:100vh; display:flex; flex-direction:column; align-items:center; padding:32px 20px 60px; position:relative; z-index:1; }
    .quiz-selection-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:12px; width:100%; max-width:680px; margin-top:8px; }
    .quiz-selection-card { background:var(--card); border:1.5px solid var(--border); border-radius:14px; padding:18px 18px 16px; cursor:pointer; display:flex; flex-direction:column; gap:0; transition:all 0.2s; position:relative; overflow:hidden; }
    .quiz-selection-card:hover { border-color:var(--accent); transform:translateY(-2px); box-shadow:0 8px 28px rgba(32,192,200,0.12); }
    .quiz-sel-icon { font-size:24px; margin-bottom:10px; }
    .quiz-sel-title { font-size:15px; font-weight:700; color:var(--t1); margin-bottom:5px; line-height:1.3; }
    .quiz-sel-desc { font-size:12px; color:var(--t2); line-height:1.5; flex:1; }
    .quiz-sel-count { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:var(--accent); font-weight:700; margin-bottom:6px; }
    .quiz-mode-row { display:flex; gap:10px; margin-top:16px; }
    .quiz-mode-btn { flex:1; padding:9px 0; border-radius:10px; border:1.5px solid var(--border); background:var(--card); color:var(--t2); font-size:13px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.15s; }
    .quiz-mode-btn.active { background:var(--accent); border-color:var(--accent); color:#fff; }
    .quiz-mode-btn:not(.active):hover { border-color:var(--t3); }
    .quiz-mode-btn:disabled { opacity:0.35; cursor:not-allowed; border-style:dashed; }
    .quiz-start-btn { padding:14px 20px; border-radius:12px; border:none; background:var(--accent); color:#fff; font-size:15px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.15s; box-shadow:0 4px 20px rgba(32,192,200,0.3); }
    .quiz-start-btn:hover { transform:translateY(-2px); box-shadow:0 6px 28px rgba(32,192,200,0.4); }
    .quiz-container { width:100%; max-width:560px; margin-top:8px; }
    .quiz-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; }
    .quiz-progress-label { font-family:'Space Mono',monospace; font-size:12px; color:var(--t2); font-weight:600; }
    .quiz-score-label { font-family:'Space Mono',monospace; font-size:12px; color:var(--accent); font-weight:700; }
    .quiz-progress-bar { height:4px; background:var(--border); border-radius:2px; overflow:hidden; margin-bottom:32px; }
    .quiz-progress-fill { height:100%; background:var(--accent); border-radius:2px; transition:width 0.4s ease; }
    .quiz-question-card { background:var(--card); border:1.5px solid var(--border); border-radius:20px; padding:40px 32px; text-align:center; margin-bottom:24px; animation:slideIn 0.3s cubic-bezier(0.22,1,0.36,1) both; }
    .quiz-class-label { font-family:'Space Mono',monospace; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:var(--t3); margin-bottom:12px; }
    .quiz-class-number { font-size:clamp(48px,10vw,80px); font-weight:700; color:var(--accent); line-height:1; margin-bottom:8px; font-family:'Space Mono',monospace; }
    .quiz-class-img { width:160px; height:160px; object-fit:contain; border-radius:12px; margin:8px auto 12px; display:block; }
    .quiz-class-question { font-size:18px; color:var(--t2); }
    .quiz-input { width:100%; padding:16px 18px; background:var(--card); border:1.5px solid var(--border); border-radius:12px; color:var(--t1); font-size:16px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.15s; margin-bottom:12px; }
    .quiz-input:focus { border-color:var(--accent); }
    .quiz-input::placeholder { color:var(--t3); }
    .quiz-input:disabled { opacity:0.5; }
    .quiz-submit-btn { width:100%; padding:14px; border-radius:12px; border:none; background:var(--accent); color:#fff; font-size:15px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.15s; }
    .quiz-submit-btn:hover:not(:disabled) { transform:translateY(-1px); }
    .quiz-submit-btn:disabled { opacity:0.4; cursor:default; }
    .quiz-feedback { border-radius:14px; padding:18px 20px; margin-bottom:12px; animation:fadeIn 0.2s ease; }
    .quiz-feedback.correct { background:var(--confident-bg); border:1.5px solid var(--confident-border); }
    .quiz-feedback.incorrect { background:#ef444412; border:1.5px solid #ef444430; }
    .quiz-feedback-icon { font-size:22px; margin-bottom:6px; }
    .quiz-feedback-answer { font-size:14px; line-height:1.6; }
    .quiz-next-btn { width:100%; padding:14px; border-radius:12px; border:1.5px solid var(--border); background:var(--card); color:var(--t1); font-size:15px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.15s; }
    .quiz-next-btn:hover { border-color:var(--accent); color:var(--accent); }
    .quiz-done-card { background:var(--card); border:1.5px solid var(--border); border-radius:20px; padding:40px 32px; text-align:center; }
    .quiz-done-score { font-size:clamp(48px,10vw,72px); font-weight:700; color:var(--accent); font-family:'Space Mono',monospace; line-height:1; margin:16px 0 8px; }

    /* Multiple-choice styles */
    .mc-question-card { padding:28px 24px 24px; }
    .mc-section-label { font-size:11px; font-weight:600; font-family:'Space Mono',monospace; letter-spacing:0.5px; color:var(--accent); background:var(--accent)15; border:1px solid var(--accent)30; border-radius:20px; padding:3px 10px; display:inline-block; margin:6px auto 2px; }
    .mc-question-text { font-size:clamp(15px,2.5vw,18px); font-weight:600; color:var(--t1); line-height:1.55; text-align:center; margin-top:10px; }
    .mc-options { display:flex; flex-direction:column; gap:10px; margin-bottom:12px; }
    .solas-num-grid { display:grid; grid-template-columns:repeat(5, 1fr); gap:8px; margin-bottom:16px; }
    .solas-num-btn { padding:12px 4px; border-radius:10px; border:1.5px solid var(--border); background:var(--card); color:var(--t1); font-family:'Space Mono',monospace; font-size:13px; font-weight:700; cursor:pointer; text-align:center; transition:all 0.15s; line-height:1.2; }
    .solas-num-btn:hover:not(:disabled) { border-color:var(--accent); background:var(--card-h); color:var(--accent); }
    .solas-num-btn:disabled { cursor:default; }
    .solas-num-btn-correct { border-color:var(--confident) !important; background:var(--confident-bg) !important; color:var(--confident) !important; }
    .solas-num-btn-wrong   { border-color:#ef4444 !important; background:#ef444412 !important; color:#ef4444 !important; }
    .mc-option { display:flex; align-items:flex-start; gap:12px; width:100%; padding:14px 16px; border-radius:12px; border:1.5px solid var(--border); background:var(--card); color:var(--t1); font-size:14px; font-weight:500; font-family:'DM Sans',sans-serif; cursor:pointer; text-align:left; transition:all 0.15s; line-height:1.45; }
    .mc-option:hover:not(:disabled) { border-color:var(--accent); background:var(--card-h); transform:translateX(2px); }
    .mc-option:disabled { cursor:default; }
    .mc-option-correct { border-color:var(--confident) !important; background:var(--confident-bg) !important; color:var(--confident) !important; }
    .mc-option-wrong   { border-color:#ef4444 !important; background:#ef444412 !important; color:#ef4444 !important; }
    .mc-letter { flex-shrink:0; width:24px; height:24px; border-radius:6px; background:var(--border); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; font-family:'Space Mono',monospace; color:var(--t2); transition:inherit; }
    .mc-option-correct .mc-letter { background:var(--confident); color:#fff; }
    .mc-option-wrong   .mc-letter { background:#ef4444; color:#fff; }
    .mc-opt-text { flex:1; }

    /* SOLAS Hint */
    .hint-btn { background:none; border:1.5px dashed var(--border); border-radius:20px; padding:5px 14px; font-size:11px; font-family:'Space Mono',monospace; font-weight:600; letter-spacing:0.5px; color:var(--t2); cursor:pointer; transition:all 0.15s; }
    .hint-btn:hover { border-color:var(--review); color:var(--review); }
    .hint-card { background:var(--card); border:1.5px dashed var(--review); border-radius:12px; padding:16px 20px; margin-bottom:12px; font-size:15px; line-height:2; color:var(--t2); text-align:center; animation:fadeIn 0.2s ease; }
    .hint-blank { color:var(--review); font-weight:700; letter-spacing:3px; border-bottom:2px solid var(--review); padding-bottom:1px; }

    /* Pilot Ladder Poster */
    .poster-btn { background:none; border:1.5px solid var(--border); border-radius:20px; padding:5px 14px; font-size:11px; font-family:'Space Mono',monospace; font-weight:600; letter-spacing:0.5px; color:var(--t2); cursor:pointer; transition:all 0.15s; }
    .poster-btn:hover { border-color:var(--accent); color:var(--accent); background:var(--accent)10; }
    .poster-overlay { position:fixed; inset:0; z-index:9999; display:flex; flex-direction:column; background:rgba(0,0,0,0.97); animation:fadeIn 0.2s ease; }
    .poster-overlay-header { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; border-bottom:1px solid rgba(255,255,255,0.1); flex-shrink:0; }
    .poster-overlay-title { font-family:'Space Mono',monospace; font-size:12px; font-weight:700; color:#fff; letter-spacing:1px; }
    .poster-close-btn { background:rgba(255,255,255,0.1); border:none; color:#fff; border-radius:8px; width:34px; height:34px; cursor:pointer; font-size:18px; display:flex; align-items:center; justify-content:center; transition:background 0.15s; line-height:1; }
    .poster-close-btn:hover { background:rgba(255,255,255,0.2); }
    .poster-newtab-btn { font-size:11px; font-family:'Space Mono',monospace; font-weight:600; color:var(--accent); background:none; border:1.5px solid var(--accent); border-radius:8px; padding:5px 12px; cursor:pointer; text-decoration:none; transition:all 0.15s; letter-spacing:0.3px; }
    .poster-newtab-btn:hover { background:var(--accent); color:#000; }
    .poster-frame-wrap { flex:1; overflow:hidden; display:flex; }
    .poster-frame { width:100%; height:100%; border:none; flex:1; }

    .confidence-filter { display:flex; align-items:center; gap:8px; margin-bottom:18px; flex-wrap:wrap; }
    .confidence-filter-label { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:var(--t3); font-weight:700; margin-right:4px; }
    .cf-btn { padding:6px 14px; border-radius:20px; border:1.5px solid var(--border); background:var(--card); color:var(--t2); font-size:12px; font-weight:500; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.15s; display:inline-flex; align-items:center; gap:6px; }
    .cf-btn:hover { border-color:var(--t3); }
    .cf-btn.active { background:var(--accent); border-color:var(--accent); color:#fff; font-weight:600; }
    .cf-btn.active-review { background:var(--review); border-color:var(--review); color:#fff; font-weight:600; }
    .cf-btn.active-review .tag-dot { background:#fff; }
    .cf-btn.active-confident { background:var(--confident); border-color:var(--confident); color:#fff; font-weight:600; }
    .cf-btn.active-confident .tag-dot { background:#fff; }
    .cf-count { font-family:'Space Mono',monospace; font-size:10px; opacity:0.85; }

    /* Related questions */
    .related-section { margin-bottom:24px; }
    .related-toggle { display:inline-flex; align-items:center; gap:8px; background:var(--card); border:1px solid var(--border); border-radius:8px; padding:8px 14px; cursor:pointer; transition:all 0.15s; font-family:'DM Sans',sans-serif; }
    .related-toggle:hover { border-color:var(--t3); }
    .related-toggle .icon { font-size:14px; }
    .related-toggle .label { font-size:12px; font-weight:600; color:var(--accent); }
    .related-body { margin-top:12px; display:flex; flex-direction:column; gap:8px; animation:fadeIn 0.2s ease; }
    .related-card { background:var(--card); border:1px solid var(--border); border-radius:10px; padding:12px 16px; cursor:pointer; transition:all 0.15s; text-align:left; font-family:'DM Sans',sans-serif; display:flex; gap:12px; align-items:flex-start; }
    .related-card:hover { border-color:var(--t3); background:var(--card-h); }
    .related-card .rq-cat { font-family:'Space Mono',monospace; font-size:10px; font-weight:700; letter-spacing:0.5px; white-space:nowrap; }
    .related-card .rq-text { font-size:13px; color:var(--t2); line-height:1.5; }

    /* Desktop responsive layout */
    .home-container { max-width:860px; margin:0 auto; padding:32px 20px 60px; position:relative; z-index:1; }
    .header-row { display:flex; flex-direction:column; gap:24px; margin-bottom:36px; animation:fadeIn 0.6s ease; }
    .home-header { text-align:center; }
    .home-header p { max-width:500px; margin:0 auto; }
    .daily-card { flex:1; min-width:0; }
    /* === LANDING PAGE === */
    .landing-container { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 24px; position:relative; z-index:1; }
    .landing-title { font-family:'Space Mono',monospace; font-size:11px; letter-spacing:5px; text-transform:uppercase; color:var(--accent); font-weight:700; margin-bottom:20px; }
    .landing-heading { font-size:clamp(32px,6vw,60px); font-weight:700; text-align:center; margin-bottom:12px; line-height:1.1; color:var(--t1); }
    .landing-sub { font-size:clamp(14px,2vw,17px); color:var(--t2); text-align:center; margin-bottom:60px; max-width:480px; line-height:1.6; }
    .landing-cards { display:flex; gap:20px; width:100%; max-width:780px; }
    @media (max-width:600px) { .landing-cards { flex-direction:column; } }
    .landing-card { flex:1; border-radius:20px; padding:40px 32px; cursor:pointer; border:1.5px solid var(--border); background:var(--card); transition:all 0.25s cubic-bezier(0.22,1,0.36,1); display:flex; flex-direction:column; gap:14px; position:relative; overflow:hidden; }
    .landing-card:not(.coming-soon):hover { transform:translateY(-5px); box-shadow:0 12px 40px rgba(32,192,200,0.15); border-color:var(--accent); }
    .landing-card-badge { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:2.5px; text-transform:uppercase; font-weight:700; display:inline-block; padding:5px 12px; border-radius:20px; width:fit-content; }
    .landing-card-label { font-family:'Space Mono',monospace; font-size:clamp(36px,6vw,52px); font-weight:700; line-height:1; }
    .landing-card-name { font-size:clamp(16px,2.5vw,20px); font-weight:600; color:var(--t1); }
    .landing-card-desc { font-size:14px; color:var(--t2); line-height:1.65; flex:1; }
    .landing-card-arrow { font-size:18px; color:var(--accent); margin-top:8px; transition:transform 0.2s; font-weight:700; }
    .landing-card:not(.coming-soon):hover .landing-card-arrow { transform:translateX(6px); }
    .landing-card.coming-soon { opacity:0.5; cursor:default; pointer-events:none; }

    .hero-row { display:flex; flex-direction:column; gap:12px; margin-bottom:28px; }
    .hero-right { display:flex; justify-content:center; gap:10px; flex-wrap:wrap; align-items:stretch; }
    .hero-btn { color:#fff; border:none; border-radius:12px; padding:16px 20px; font-size:15px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; flex:1 1 0; min-width:0; }
    .hero-btn-sub { font-size:10px; font-family:'Space Mono',monospace; letter-spacing:2px; text-transform:uppercase; opacity:0.9; }
    .themes-grid { display:flex; flex-direction:column; gap:12px; }
    .theme-card { background:var(--card); border:1px solid var(--border); border-radius:14px; overflow:hidden; transition:all 0.2s; }
    .theme-card-header { width:100%; background:none; border:none; padding:18px 22px; cursor:pointer; text-align:left; display:flex; align-items:center; gap:14px; color:var(--t1); font-family:'DM Sans',sans-serif; transition:background 0.15s; }
    .theme-card-header:hover { background:var(--card-h); }
    .theme-card-body { padding:0 22px 20px; border-top:1px solid var(--border); }
    .theme-card-body-inner { padding-top:14px; display:flex; flex-direction:column; gap:0; }
    .theme-item { display:flex; gap:12px; padding:9px 0; font-size:14px; line-height:1.6; }
    .theme-item + .theme-item { border-top:1px solid var(--border); }
    .theme-item .bullet { color:var(--accent); flex-shrink:0; margin-top:4px; font-size:6px; line-height:22px; }
    .theme-item .key { color:var(--t1); font-weight:600; white-space:nowrap; }
    .theme-item .desc { color:var(--t2); }
    .theme-badge { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:1px; color:var(--t3); font-weight:700; padding:4px 10px; background:var(--card-h); border-radius:6px; white-space:nowrap; }
    .theme-chevron { color:var(--t3); font-size:14px; transition:transform 0.2s; }
    .theme-section-title { font-size:15px; font-weight:700; flex:1; }
    .theme-section-icon { font-size:20px; flex-shrink:0; }
    /* Examiner tips special styling */
    .theme-card.tips-card { border-color:var(--daily-border); }
    .theme-card.tips-card .theme-item .bullet { color:var(--daily-accent); }
    /* M-Notices: sub-group headers */
    .mnotice-group { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:var(--accent); font-weight:700; padding:12px 0 6px; margin-top:4px; }
    .mnotice-group:first-child { padding-top:0; margin-top:0; }
    .practice-container { max-width:700px; margin:0 auto; padding:24px 20px 60px; position:relative; z-index:1; }
    .practice-layout { display:flex; flex-direction:column; gap:24px; }
    .practice-main { flex:1; min-width:0; }
    .practice-sidebar { display:none; }

    @media (min-width: 1024px) {
      .home-container { max-width:1200px; padding:40px 40px 60px; }
      .header-row { flex-direction:row; align-items:center; gap:40px; }
      .home-header { text-align:left; flex:0 0 auto; }
      .home-header p { margin:0; }
      .daily-card { flex:1; min-width:280px; }
      .hero-row { flex-direction:row; align-items:stretch; gap:14px; }
      .hero-right { flex-direction:row; align-items:stretch; flex:1; min-width:0; }
      .themes-grid { display:grid; grid-template-columns:1fr; gap:14px; }
      .practice-container { max-width:1100px; padding:32px 40px 60px; }
      .practice-layout { flex-direction:row; gap:32px; }
      .practice-main { flex:1; }
      .practice-sidebar { display:block; flex:0 0 280px; position:sticky; top:24px; align-self:flex-start; }
    }

    @media (min-width: 1400px) {
      .home-container { max-width:1400px; }
    }

    /* Bookmarks */
    .tag-btn.active-bookmark { background:var(--bookmark-bg); border-color:var(--bookmark-border); color:var(--bookmark); }

    /* Quick actions strip */
    .quick-actions-strip {
      display:flex; align-items:center; justify-content:space-between; gap:12px;
      background:var(--card); border:1.5px solid var(--accent);
      border-radius:12px; padding:12px 18px; margin-bottom:14px;
      animation:fadeIn 0.3s ease; flex-wrap:wrap;
    }
    .quick-actions-info { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .qa-stat { font-family:'Space Mono',monospace; font-size:12px; font-weight:600; color:var(--t2); }
    .qa-dot { color:var(--t3); font-size:12px; }
    .qa-review { color:var(--review); }
    .qa-bookmarked { color:var(--bookmark); }
    .qa-drill-btn {
      background:var(--accent); border:none; border-radius:8px; padding:8px 16px;
      color:#fff; font-size:13px; font-weight:600; cursor:pointer;
      font-family:'DM Sans',sans-serif; transition:all 0.15s; white-space:nowrap;
      box-shadow:0 2px 12px rgba(32,192,200,0.3);
    }
    .qa-drill-btn:hover { transform:translateY(-1px); box-shadow:0 4px 16px rgba(32,192,200,0.4); }

    /* Keyboard shortcuts */
    .kbd {
      display:inline-block; background:var(--border); border-radius:4px;
      padding:1px 6px; font-family:'Space Mono',monospace; font-size:11px;
      color:var(--t2); font-weight:600; min-width:24px; text-align:center;
    }
    .shortcuts-hint-mobile {
      text-align:center; font-size:11px; color:var(--t2); margin-top:16px;
      font-family:'Space Mono',monospace; letter-spacing:0.3px;
    }
    @media (min-width: 1024px) {
      .shortcuts-hint-mobile { display:none; }
    }

    /* Progress dashboard */
    .stats-grid {
      display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr));
      gap:12px; margin-bottom:24px;
    }
    .stat-card {
      background:var(--card); border:1px solid var(--border); border-radius:16px;
      padding:24px; text-align:center;
    }
    .stat-value {
      font-family:'Space Mono',monospace; font-size:36px; font-weight:700;
      color:var(--accent); line-height:1.2; margin-bottom:6px;
    }
    .stat-label {
      font-family:'Space Mono',monospace; font-size:10px; letter-spacing:2px;
      text-transform:uppercase; color:var(--t3); font-weight:700;
    }
    .topic-stats { display:flex; flex-direction:column; gap:10px; }
    .topic-stat-row { display:flex; align-items:center; gap:12px; }
    .topic-stat-label { display:flex; align-items:center; gap:8px; min-width:220px; flex-shrink:0; }
    .topic-stat-name {
      font-size:13px; font-weight:500; color:var(--t1);
      overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:190px;
    }
    .topic-stat-nums { font-family:'Space Mono',monospace; font-size:11px; color:var(--t3); }
    .topic-stat-bar-bg {
      flex:1; height:8px; background:var(--border); border-radius:4px;
      overflow:hidden; display:flex; gap:1px;
    }
    .topic-stat-bar-fill { height:100%; border-radius:4px; transition:width 0.5s ease; }
    .topic-stat-pct {
      font-family:'Space Mono',monospace; font-size:12px; font-weight:700;
      color:var(--t2); min-width:36px; text-align:right;
    }
    @media (max-width: 1023px) {
      .topic-stat-label { min-width:140px; }
      .topic-stat-name { max-width:110px; }
    }
    /* === EXAM SIMULATION === */
    @keyframes examSlideIn {
      from { opacity:0; transform:translateX(40px); }
      to { opacity:1; transform:translateX(0); }
    }
    @keyframes timerPulse {
      0%,100% { opacity:1; }
      50% { opacity:0.6; }
    }
    @keyframes followOnSlide {
      from { opacity:0; transform:translateY(-8px); }
      to { opacity:1; transform:translateY(0); }
    }
    .exam-container { max-width:700px; margin:0 auto; padding:24px 20px 60px; position:relative; z-index:1; }
    .exam-setup-container { max-width:640px; margin:0 auto; padding:40px 20px 60px; position:relative; z-index:1; text-align:center; }
    .exam-info-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin:28px 0; }
    .exam-info-card { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:20px 16px; text-align:center; }
    .exam-info-icon { font-size:24px; margin-bottom:8px; }
    .exam-info-value { font-family:'Space Mono',monospace; font-size:24px; font-weight:700; color:var(--accent); margin-bottom:4px; }
    .exam-info-label { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:var(--t3); font-weight:700; }
    .exam-timer { font-family:'Space Mono',monospace; font-size:28px; font-weight:700; letter-spacing:2px; color:var(--t1); }
    .exam-timer.warning { color:#d4b212; }
    .exam-timer.danger { color:#ef4444; animation:timerPulse 1s infinite; }
    .exam-card { background:var(--card); border-radius:16px; padding:36px 32px; margin-bottom:24px; min-height:200px; display:flex; flex-direction:column; justify-content:center; animation:examSlideIn 0.35s cubic-bezier(0.22,1,0.36,1) both; }
    .follow-on-badge { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:8px; font-family:'Space Mono',monospace; font-size:10px; font-weight:700; letter-spacing:1px; text-transform:uppercase; animation:followOnSlide 0.3s ease; margin-bottom:12px; }
    .exam-confidence-row { display:flex; gap:10px; margin-bottom:24px; }
    .exam-conf-btn { flex:1; padding:12px 16px; border-radius:10px; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; transition:all 0.15s; text-align:center; border:1.5px solid var(--border); background:var(--card); color:var(--t2); }
    .exam-conf-btn:hover { border-color:var(--t3); }
    .exam-conf-btn.active-confident { background:var(--confident-bg); border-color:var(--confident); color:var(--confident); }
    .exam-conf-btn.active-unsure { background:#d4b21214; border-color:#d4b212; color:#d4b212; }
    .exam-conf-btn.active-no-idea { background:#ef444414; border-color:#ef4444; color:#ef4444; }
    .exam-results-container { max-width:860px; margin:0 auto; padding:32px 20px 60px; position:relative; z-index:1; }
    .exam-review-item { background:var(--card); border:1px solid var(--border); border-radius:12px; margin-bottom:8px; overflow:hidden; }
    .exam-review-header { width:100%; background:none; border:none; padding:14px 18px; cursor:pointer; text-align:left; display:flex; align-items:center; gap:10px; color:var(--t1); font-family:'DM Sans',sans-serif; transition:background 0.15s; font-size:14px; }
    .exam-review-header:hover { background:var(--card-h); }
    .exam-review-body { padding:0 18px 18px; border-top:1px solid var(--border); padding-top:14px; }
    @media (max-width:640px) {
      .exam-info-grid { grid-template-columns:1fr; }
      .exam-confidence-row { flex-direction:column; }
    }
  `;

  const themeBtn = (label, isActive, onClick) => (
    <button onClick={onClick} style={{
      background: isActive ? "var(--accent)" : "var(--card)",
      border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
      borderRadius: "8px", padding: "9px 16px",
      color: isActive ? "#fff" : "var(--t2)", fontSize: "13px", fontWeight: isActive ? 600 : 400,
      cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.15s"
    }}>{label}</button>
  );

  const themeToggle = (
    <div className="theme-toggle">
      <span className="theme-toggle-label">{theme === "dark" ? "☾" : "☀"}</span>
      <label className="theme-switch">
        <input type="checkbox" checked={theme === "light"} onChange={toggleTheme}/>
        <span className="slider"/>
      </label>
    </div>
  );

  // LANDING
  if (view === "landing") {
    return (
      <>
        <style>{styles}</style>
        <div data-theme={theme} style={{ fontFamily:"'DM Sans',sans-serif", background:"var(--bg)", minHeight:"100vh", color:"var(--t1)", position:"relative", overflow:"hidden", transition:"background 0.3s, color 0.3s" }}>
          {themeToggle}
          <div className="dark-pattern"/><div className="light-pattern"/>
          <div style={{ position:"fixed",top:0,left:0,right:0,height:"300px", background:theme==="light" ? `radial-gradient(ellipse at 50% -20%,rgba(51,87,101,var(--glow-opacity)) 0%,transparent 70%)` : `radial-gradient(ellipse at 50% -20%,rgba(32,192,200,var(--glow-opacity)) 0%,transparent 70%)`, zIndex:0 }}/>

          <div key={viewKey} className="landing-container view-enter">
            <div className="landing-title">MCA OOW Unlimited</div>
            <h1 className="landing-heading">Oral Exam Prep</h1>
            <p className="landing-sub">Select your exam part to begin studying.</p>

            <div className="landing-cards">
              {/* Part A — active */}
              <div className="landing-card" onClick={() => changeView("part-a")} role="button" tabIndex={0}
                onKeyDown={e => e.key === "Enter" && changeView("part-a")}>
                <div className="landing-card-badge" style={{ background:"var(--accent)18", color:"var(--accent)" }}>Available Now</div>
                <div className="landing-card-label" style={{ color:"var(--accent)" }}>Part A</div>
                <div className="landing-card-desc">Helpful mini quizzes covering Part A topics to test and reinforce your knowledge ahead of the oral exam.</div>
                <div className="landing-card-arrow">→</div>
              </div>

              {/* Part B — active */}
              <div className="landing-card" onClick={() => changeView("home")} role="button" tabIndex={0}
                onKeyDown={e => e.key === "Enter" && changeView("home")}>
                <div className="landing-card-badge" style={{ background:"var(--accent)18", color:"var(--accent)" }}>Available Now</div>
                <div className="landing-card-label" style={{ color:"var(--accent)" }}>Part B</div>
                <div className="landing-card-desc">869 oral exam questions across 22 topics, sourced from real MCA examiner reports.</div>
                <div className="landing-card-arrow">→</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // PART A — quiz selection
  if (view === "part-a") {
    return (
      <>
        <style>{styles}</style>
        <div data-theme={theme} style={{ fontFamily:"'DM Sans',sans-serif", background:"var(--bg)", minHeight:"100vh", color:"var(--t1)", position:"relative", overflow:"hidden", transition:"background 0.3s, color 0.3s" }}>
          {themeToggle}
          <div style={{ position:"fixed",inset:0,opacity:0.03,zIndex:0, backgroundImage:`radial-gradient(circle at 1px 1px,var(--dot) 1px,transparent 0)`, backgroundSize:"32px 32px" }}/>
          <div className="dark-pattern"/><div className="light-pattern"/>
          <div style={{ position:"fixed",top:0,left:0,right:0,height:"300px", background:theme==="light"?`radial-gradient(ellipse at 50% -20%,rgba(51,87,101,var(--glow-opacity)) 0%,transparent 70%)`:`radial-gradient(ellipse at 50% -20%,rgba(32,192,200,var(--glow-opacity)) 0%,transparent 70%)`, zIndex:0 }}/>
          <div key={viewKey} className="quiz-page view-enter">
            <button onClick={() => changeView("landing")} style={{ alignSelf:"flex-start", background:"none", border:"none", color:"var(--t3)", fontSize:"12px", fontFamily:"'Space Mono',monospace", letterSpacing:"1px", cursor:"pointer", padding:"0 0 24px 0", transition:"color 0.15s" }}
              onMouseOver={e=>e.currentTarget.style.color="var(--t2)"} onMouseOut={e=>e.currentTarget.style.color="var(--t3)"}>
              ← PART A
            </button>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"11px", letterSpacing:"4px", textTransform:"uppercase", color:"var(--accent)", marginBottom:"8px", fontWeight:700, alignSelf:"flex-start" }}>PART A</div>
            <h1 style={{ fontSize:"clamp(24px,4vw,36px)", fontWeight:700, marginBottom:"6px", color:"var(--t1)", alignSelf:"flex-start" }}>Quizzes</h1>
            <p style={{ color:"var(--t2)", fontSize:"14px", marginBottom:"28px", alignSelf:"flex-start" }}>Select a quiz and choose your mode to begin.</p>

            <div className="quiz-selection-grid">
              {PART_A_QUIZZES.map((quiz, i) => {
                const hist = quizHistory[quiz.id];
                const histPct = hist ? Math.round((hist.correct / hist.total) * 100) : null;
                const sel = quizSelectedId === quiz.id;
                const cs = !!quiz.comingSoon;
                return (
                  <div key={quiz.id} className="quiz-selection-card"
                    onClick={() => !cs && setQuizSelectedId(quiz.id)}
                    style={{ borderColor: cs ? "var(--border)" : sel ? "var(--accent)" : "var(--border)", boxShadow: sel ? "0 4px 20px rgba(32,192,200,0.15)" : "none", animation:`fadeIn 0.4s ease ${i*0.04}s both`, opacity: cs ? 0.6 : 1, cursor: cs ? "default" : "pointer" }}>
                    {cs && <div style={{ position:"absolute", top:"10px", right:"12px", background:"var(--border)", color:"var(--t3)", fontSize:"9px", fontFamily:"'Space Mono',monospace", letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:700, padding:"3px 7px", borderRadius:"5px" }}>Coming Soon</div>}
                    {sel && !cs && <div style={{ position:"absolute", top:"12px", right:"14px", width:"20px", height:"20px", borderRadius:"6px", background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", color:"#fff", fontWeight:700 }}>✓</div>}
                    <div className="quiz-sel-icon">{quiz.icon}</div>
                    {!cs && <div className="quiz-sel-count">{quiz.count} Questions</div>}
                    <div className="quiz-sel-title">{quiz.title}</div>
                    <div className="quiz-sel-desc">{quiz.desc}</div>
                    {!cs && histPct !== null && (
                      <div style={{ marginTop:"10px", display:"flex", alignItems:"center", gap:"8px" }}>
                        <div style={{ flex:1, height:"3px", borderRadius:"2px", background:"var(--border)", overflow:"hidden" }}>
                          <div style={{ width:`${histPct}%`, height:"100%", background: histPct>=80?"var(--confident)":histPct>=50?"var(--review)":"#ef4444", borderRadius:"2px", transition:"width 0.3s" }}/>
                        </div>
                        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", color:"var(--t3)", whiteSpace:"nowrap" }}>{histPct}%</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mode + Start — span full grid width */}
              <div style={{ gridColumn:"1/-1", display:"flex", gap:"12px", alignItems:"stretch", flexWrap:"wrap" }}>
                <div style={{ background:"var(--card)", border:"1.5px solid var(--border)", borderRadius:"12px", padding:"14px 18px", flex:"1", minWidth:"200px" }}>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", color:"var(--t3)", fontWeight:700, marginBottom:"10px" }}>Mode</div>
                  <div className="quiz-mode-row" style={{ marginTop:0 }}>
                    <button className={`quiz-mode-btn${quizSelectedMode==="ordered" && quizSelectedId!=="solas-numbers"?" active":""}`}
                      onClick={() => setQuizSelectedMode("ordered")}
                      disabled={quizSelectedId==="solas-numbers"}
                      title={quizSelectedId==="solas-numbers" ? "This quiz is always randomised" : ""}>In Order</button>
                    <button className={`quiz-mode-btn${quizSelectedMode==="random" || quizSelectedId==="solas-numbers"?" active":""}`}
                      onClick={() => setQuizSelectedMode("random")}>Random</button>
                  </div>
                </div>
                <button className="quiz-start-btn" style={{ flex:"2", minWidth:"160px", margin:0 }}
                  onClick={() => startQuiz(quizSelectedId, quizSelectedId==="solas-numbers" ? "random" : quizSelectedMode)}>
                  Start Quiz →
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // PART A — IALA Buoyage quiz
  if (view === "part-a-quiz" && quizId === "iala-buoyage") {
    const item   = quizDone ? null : IALA_BUOYAGE[quizOrder[quizPos]];
    const pct    = quizDone ? 100 : Math.round((quizPos / quizOrder.length) * 100);
    const CATS   = ["shape","colour","lightColour","lightPattern","topMark"];
    const accentBtn = { padding:"12px 20px", borderRadius:"10px", border:"none", background:"var(--accent)", color:"#fff", fontWeight:700, fontSize:"14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" };
    const outlineBtn = { padding:"12px 20px", borderRadius:"10px", border:"1.5px solid var(--border)", background:"var(--card)", color:"var(--t1)", fontWeight:600, fontSize:"14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" };

    // All 5 categories must have ≥1 selection to enable submit
    const canSubmit = !buoyFeedback && CATS.every(c => (buoySelected[c] || []).length > 0);

    const chipStyle = (cat, opt) => {
      const sel = (buoySelected[cat] || []).includes(opt);
      const isCorrectOpt = item && item.correct[cat].includes(opt);
      if (!buoyFeedback) {
        return { padding:"7px 12px", borderRadius:"8px", fontSize:"13px", fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.12s", border: sel ? "1.5px solid var(--accent)" : "1.5px solid var(--border)", background: sel ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "var(--card)", color: sel ? "var(--accent)" : "var(--t1)" };
      }
      if (isCorrectOpt && sel)  return { padding:"7px 12px", borderRadius:"8px", fontSize:"13px", fontWeight:600, cursor:"default", fontFamily:"'DM Sans',sans-serif", border:"1.5px solid #22c55e", background:"#22c55e15", color:"#22c55e" };
      if (isCorrectOpt && !sel) return { padding:"7px 12px", borderRadius:"8px", fontSize:"13px", fontWeight:600, cursor:"default", fontFamily:"'DM Sans',sans-serif", border:"1.5px solid #f59e0b", background:"#f59e0b15", color:"#f59e0b" };
      if (!isCorrectOpt && sel) return { padding:"7px 12px", borderRadius:"8px", fontSize:"13px", fontWeight:600, cursor:"default", fontFamily:"'DM Sans',sans-serif", border:"1.5px solid #ef4444", background:"#ef444415", color:"#ef4444" };
      return { padding:"7px 12px", borderRadius:"8px", fontSize:"13px", fontWeight:400, cursor:"default", fontFamily:"'DM Sans',sans-serif", border:"1.5px solid var(--border)", background:"var(--card)", color:"var(--t3)", opacity:0.5 };
    };

    const catLabelColor = (cat) => {
      if (!buoyFeedback || !item) return "var(--t3)";
      const cSet = new Set(item.correct[cat]);
      const sArr = buoySelected[cat] || [];
      return sArr.length === cSet.size && sArr.every(x => cSet.has(x)) ? "#22c55e" : "#ef4444";
    };

    return (
      <>
        <style>{styles}</style>
        <div data-theme={theme} style={{ fontFamily:"'DM Sans',sans-serif", background:"var(--bg)", minHeight:"100vh", color:"var(--t1)", position:"relative", overflow:"hidden", transition:"background 0.3s, color 0.3s" }}>
          {themeToggle}
          <div className="dark-pattern"/><div className="light-pattern"/>
          <div key={viewKey} className="quiz-page view-enter" style={{ paddingTop:"40px" }}>
            <div className="quiz-container">
              <div className="quiz-header">
                <button onClick={() => changeView("part-a")} style={{ background:"none", border:"none", color:"var(--t3)", fontSize:"12px", fontFamily:"'Space Mono',monospace", letterSpacing:"1px", cursor:"pointer", padding:0, transition:"color 0.15s" }}
                  onMouseOver={e=>e.currentTarget.style.color="var(--t2)"} onMouseOut={e=>e.currentTarget.style.color="var(--t3)"}>
                  ← Buoyage
                </button>
                {!quizDone && <div className="quiz-progress-label">{quizPos + 1} / {quizOrder.length}</div>}
                <div className="quiz-score-label">{buoyScore.correct} / {buoyScore.total} correct</div>
              </div>
              {!quizDone && <div className="quiz-progress-bar"><div className="quiz-progress-fill" style={{ width:`${pct}%` }}/></div>}

              {quizDone ? (
                <div className="quiz-done-card" style={{ animation:"examSetupEnter 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
                  <div style={{ fontSize:"36px", marginBottom:"8px" }}>{buoyScore.correct === buoyScore.total ? "🎉" : buoyScore.correct >= buoyScore.total * 0.7 ? "👍" : "📖"}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", color:"var(--t3)", marginBottom:"4px" }}>Final Score</div>
                  <div className="quiz-done-score">{buoyScore.correct}<span style={{ fontSize:"0.5em", color:"var(--t2)" }}>/{buoyScore.total}</span></div>
                  <div style={{ color:"var(--t2)", marginBottom:"28px", fontSize:"14px" }}>
                    {buoyScore.correct === buoyScore.total ? "Perfect — all marks identified!" : `${Math.round((buoyScore.correct/buoyScore.total)*100)}% correct`}
                  </div>
                  <div style={{ display:"flex", gap:"10px" }}>
                    <button onClick={() => startQuiz("iala-buoyage","ordered")} style={{ ...accentBtn, flex:1 }}>Try Again</button>
                    <button onClick={() => startQuiz("iala-buoyage","random")}  style={{ ...outlineBtn, flex:1 }}>Try Random</button>
                  </div>
                  <button onClick={() => changeView("part-a")} style={{ marginTop:"10px", width:"100%", padding:"10px", borderRadius:"10px", border:"none", background:"none", color:"var(--t3)", fontSize:"13px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>← Back to Quizzes</button>
                </div>
              ) : (
                <>
                  <div className="quiz-question-card mc-question-card" key={quizPos}>
                    <div className="quiz-class-label">IALA BUOYAGE</div>
                    <div className="mc-question-text" style={{ fontSize:"20px", fontWeight:700 }}>{item.q}</div>
                    <div style={{ fontSize:"12px", color:"var(--t3)", marginTop:"6px" }}>Select all correct characteristics in each category</div>
                  </div>

                  {/* Category grids */}
                  {CATS.map(cat => (
                    <div key={cat} style={{ marginBottom:"14px" }}>
                      <div style={{ fontSize:"11px", fontFamily:"'Space Mono',monospace", letterSpacing:"1.5px", textTransform:"uppercase", color: catLabelColor(cat), marginBottom:"8px", fontWeight:600, transition:"color 0.2s" }}>
                        {IALA_CAT_LABELS[cat]}
                        {buoyFeedback && (() => {
                          const cSet = new Set(item.correct[cat]);
                          const sArr = buoySelected[cat] || [];
                          const ok = sArr.length === cSet.size && sArr.every(x => cSet.has(x));
                          return <span style={{ marginLeft:"8px" }}>{ok ? "✓" : "✗"}</span>;
                        })()}
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                        {IALA_OPTIONS[cat].map(opt => (
                          <button key={opt} style={chipStyle(cat, opt)} onClick={() => buoyToggle(cat, opt)} disabled={!!buoyFeedback}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {!buoyFeedback && (
                    <button onClick={buoySubmit} disabled={!canSubmit}
                      style={{ marginTop:"8px", ...accentBtn, width:"100%", opacity: canSubmit ? 1 : 0.4 }}>
                      {canSubmit ? "Check Answers" : "Select at least one option in each category"}
                    </button>
                  )}

                  {buoyFeedback && (
                    <>
                      <div className={`quiz-feedback ${buoyFeedback}`}>
                        <div className="quiz-feedback-icon">{buoyFeedback === "correct" ? "✅" : "❌"}</div>
                        <div style={{ fontWeight:600, color: buoyFeedback === "correct" ? "var(--confident)" : "#ef4444" }}>
                          {buoyFeedback === "correct" ? "Correct!" : "Not quite — orange = missed, red = wrong selection"}
                        </div>
                      </div>
                      <button className="quiz-next-btn" onClick={buoyNext}>{quizPos+1 >= quizOrder.length ? "See Results →" : "Next →"}</button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // PART A — QUIZ (generic: IMDG, SOLAS, etc.)
  if (view === "part-a-quiz" && quizId === "marpol") {
    const item = quizDone ? null : MARPOL_ANNEX1[quizOrder[quizPos]];
    const pct  = quizDone ? 100 : Math.round((quizPos / quizOrder.length) * 100);
    const allSortAssigned = item?.type === "sort" && item.items.every((_, i) => marpolSortState[i] !== undefined);
    const accentBtn = { padding:"12px 20px", borderRadius:"10px", border:"none", background:"var(--accent)", color:"#fff", fontWeight:700, fontSize:"14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" };
    const outlineBtn = { padding:"12px 20px", borderRadius:"10px", border:"1.5px solid var(--border)", background:"var(--card)", color:"var(--t1)", fontWeight:600, fontSize:"14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" };

    const renderFeedbackBar = (fbk, correctLabel) => (
      <div className={`quiz-feedback ${fbk}`}>
        <div className="quiz-feedback-icon">{fbk === "correct" ? "✅" : "❌"}</div>
        <div className="quiz-feedback-answer" style={{ color: fbk === "correct" ? "var(--confident)" : "#ef4444", fontWeight:600, marginBottom: correctLabel ? 6 : 0 }}>
          {fbk === "correct" ? "Correct!" : correctLabel ? `Incorrect — ${correctLabel}` : "Not quite — correct answers highlighted above."}
        </div>
        {item?.explanation && <div style={{ fontSize:"13px", color:"var(--t2)", lineHeight:1.55, marginTop:4 }}>{item.explanation}</div>}
      </div>
    );

    return (
      <>
        <style>{styles}</style>
        <div data-theme={theme} style={{ fontFamily:"'DM Sans',sans-serif", background:"var(--bg)", minHeight:"100vh", color:"var(--t1)", position:"relative", overflow:"hidden", transition:"background 0.3s, color 0.3s" }}>
          {themeToggle}
          <div className="dark-pattern"/><div className="light-pattern"/>
          <div key={viewKey} className="quiz-page view-enter" style={{ paddingTop:"40px" }}>
            <div className="quiz-container">
              <div className="quiz-header">
                <button onClick={() => changeView("part-a")} style={{ background:"none", border:"none", color:"var(--t3)", fontSize:"12px", fontFamily:"'Space Mono',monospace", letterSpacing:"1px", cursor:"pointer", padding:0, transition:"color 0.15s" }}
                  onMouseOver={e=>e.currentTarget.style.color="var(--t2)"} onMouseOut={e=>e.currentTarget.style.color="var(--t3)"}>
                  ← MARPOL
                </button>
                {!quizDone && <div className="quiz-progress-label">{quizPos + 1} / {quizOrder.length}</div>}
                <div className="quiz-score-label">{marpolScore.correct} / {marpolScore.total} correct</div>
              </div>
              {!quizDone && <div className="quiz-progress-bar"><div className="quiz-progress-fill" style={{ width:`${pct}%` }}/></div>}

              {quizDone ? (
                <div className="quiz-done-card" style={{ animation:"examSetupEnter 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
                  <div style={{ fontSize:"36px", marginBottom:"8px" }}>{marpolScore.correct === marpolScore.total ? "🎉" : marpolScore.correct >= marpolScore.total * 0.7 ? "👍" : "📖"}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", color:"var(--t3)", marginBottom:"4px" }}>Final Score</div>
                  <div className="quiz-done-score">{marpolScore.correct}<span style={{ fontSize:"0.5em", color:"var(--t2)" }}>/{marpolScore.total}</span></div>
                  <div style={{ color:"var(--t2)", marginBottom:"28px", fontSize:"14px" }}>
                    {marpolScore.total === 0 ? "All flashcards reviewed!" : marpolScore.correct === marpolScore.total ? "Perfect — MARPOL Annex 1 mastered!" : `${Math.round((marpolScore.correct/marpolScore.total)*100)}% correct`}
                  </div>
                  <div style={{ display:"flex", gap:"10px" }}>
                    <button onClick={() => startQuiz("marpol","ordered")} style={{ ...accentBtn, flex:1 }}>Try Again</button>
                    <button onClick={() => startQuiz("marpol","random")}  style={{ ...outlineBtn, flex:1 }}>Try Random</button>
                  </div>
                  <button onClick={() => changeView("part-a")} style={{ marginTop:"10px", width:"100%", padding:"10px", borderRadius:"10px", border:"none", background:"none", color:"var(--t3)", fontSize:"13px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>← Back to Quizzes</button>
                </div>
              ) : (
                <>
                  {/* ── FLASHCARD ── */}
                  {item.type === "flashcard" && (
                    <>
                      <div className="quiz-question-card" key={quizPos} style={{ minHeight:"170px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center", gap:"14px" }}>
                        <div className="quiz-class-label">FLASHCARD</div>
                        {!marpolFlipped ? (
                          <>
                            <div style={{ fontSize:"17px", fontWeight:600, lineHeight:1.55, color:"var(--t1)", padding:"0 8px" }}>{item.front}</div>
                            <button onClick={() => setMarpolFlipped(true)} style={{ padding:"9px 22px", borderRadius:"10px", border:"1.5px solid var(--accent)", background:"transparent", color:"var(--accent)", fontWeight:600, fontSize:"14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                              Reveal Answer
                            </button>
                          </>
                        ) : (
                          <>
                            <div style={{ fontSize:"12px", color:"var(--t3)", fontFamily:"'Space Mono',monospace", letterSpacing:"1px", textTransform:"uppercase" }}>Answer</div>
                            <div style={{ fontSize:"15px", fontWeight:600, lineHeight:1.65, color:"var(--confident)", padding:"0 8px" }}>{item.back}</div>
                          </>
                        )}
                      </div>
                      {marpolFlipped && <button className="quiz-next-btn" onClick={marpolNext}>{quizPos+1 >= quizOrder.length ? "See Results →" : "Next →"}</button>}
                    </>
                  )}

                  {/* ── MULTIPLE CHOICE ── */}
                  {item.type === "mc" && (
                    <>
                      <div className="quiz-question-card mc-question-card" key={quizPos}>
                        <div className="quiz-class-label">MARPOL ANNEX 1</div>
                        <div className="mc-question-text">{item.q}</div>
                      </div>
                      <div className="mc-options">
                        {item.options.map((opt,i) => {
                          let state = "idle";
                          if (marpolFeedback) { if (opt === item.correct) state = "correct"; else if (opt === marpolSelected[0]) state = "wrong"; }
                          return (
                            <button key={i} className={`mc-option mc-option-${state}`} onClick={() => marpolSelectMC(opt)} disabled={!!marpolFeedback}>
                              <span className="mc-letter">{["A","B","C","D"][i]}</span>
                              <span className="mc-opt-text">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                      {marpolFeedback && <>{renderFeedbackBar(marpolFeedback, null)}<button className="quiz-next-btn" onClick={marpolNext}>{quizPos+1 >= quizOrder.length ? "See Results →" : "Next →"}</button></>}
                    </>
                  )}

                  {/* ── TRUE / FALSE ── */}
                  {item.type === "tf" && (
                    <>
                      <div className="quiz-question-card mc-question-card" key={quizPos}>
                        <div className="quiz-class-label">TRUE OR FALSE</div>
                        <div className="mc-question-text">{item.q}</div>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                        {[{ label:"True", val:true },{ label:"False", val:false }].map(({ label, val }) => {
                          let state = "idle";
                          if (marpolFeedback) { if (val === item.correct) state = "correct"; else if (marpolSelected[0] === label) state = "wrong"; }
                          return (
                            <button key={label} className={`mc-option mc-option-${state}`} onClick={() => marpolSelectTF(label, val)} disabled={!!marpolFeedback} style={{ justifyContent:"center", fontSize:"16px", fontWeight:700 }}>
                              {label}
                            </button>
                          );
                        })}
                      </div>
                      {marpolFeedback && <>{renderFeedbackBar(marpolFeedback, `the answer is ${item.correct ? "True" : "False"}.`)}<button className="quiz-next-btn" onClick={marpolNext}>{quizPos+1 >= quizOrder.length ? "See Results →" : "Next →"}</button></>}
                    </>
                  )}

                  {/* ── MULTI-SELECT (select exactly N) ── */}
                  {item.type === "multi" && (
                    <>
                      <div className="quiz-question-card mc-question-card" key={quizPos}>
                        <div className="quiz-class-label">SELECT {item.correct.length}</div>
                        <div className="mc-question-text">{item.q}</div>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                        {item.options.map((opt,i) => {
                          const sel = marpolSelected.includes(opt);
                          const isCorrectOpt = item.correct.includes(opt);
                          let bc = sel ? "var(--accent)" : "var(--border)";
                          let bg = sel ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "var(--card)";
                          let tc = sel ? "var(--accent)" : "var(--t1)";
                          if (marpolFeedback) { if (isCorrectOpt) { bc="#22c55e"; bg="#22c55e15"; tc="#22c55e"; } else if (sel) { bc="#ef4444"; bg="#ef444415"; tc="#ef4444"; } else { bc="var(--border)"; bg="var(--card)"; tc="var(--t2)"; } }
                          return (
                            <button key={i} onClick={() => { if (marpolFeedback) return; setMarpolSelected(p => p.includes(opt) ? p.filter(x=>x!==opt) : [...p,opt]); }} disabled={!!marpolFeedback}
                              style={{ padding:"12px 16px", borderRadius:"10px", border:`1.5px solid ${bc}`, background:bg, color:tc, fontWeight:500, fontSize:"14px", cursor:"pointer", textAlign:"left", fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", gap:"10px", transition:"all 0.15s" }}>
                              <span style={{ width:"18px", height:"18px", borderRadius:"4px", border:`2px solid ${bc}`, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0, background: sel ? bc : "transparent" }}>
                                {sel && <span style={{ color:"#fff", fontSize:"11px", lineHeight:1 }}>✓</span>}
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {!marpolFeedback && (
                        <button onClick={marpolSubmitMulti} disabled={marpolSelected.length !== item.correct.length}
                          style={{ marginTop:"12px", ...accentBtn, width:"100%", opacity: marpolSelected.length !== item.correct.length ? 0.45 : 1 }}>
                          {marpolSelected.length === item.correct.length ? "Check Answers" : `Select ${item.correct.length - marpolSelected.length} more`}
                        </button>
                      )}
                      {marpolFeedback && <>{renderFeedbackBar(marpolFeedback, null)}<button className="quiz-next-btn" onClick={marpolNext}>{quizPos+1 >= quizOrder.length ? "See Results →" : "Next →"}</button></>}
                    </>
                  )}

                  {/* ── SELECT ALL ── */}
                  {item.type === "select-all" && (
                    <>
                      <div className="quiz-question-card mc-question-card" key={quizPos}>
                        <div className="quiz-class-label">SELECT ALL THAT APPLY</div>
                        <div className="mc-question-text">{item.q}</div>
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                        {item.options.map((opt,i) => {
                          const sel = marpolSelected.includes(opt);
                          const isCorrectOpt = item.correct.includes(opt);
                          let bc = sel ? "var(--accent)" : "var(--border)";
                          let bg = sel ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "var(--card)";
                          let tc = sel ? "var(--accent)" : "var(--t1)";
                          if (marpolFeedback) { if (isCorrectOpt) { bc="#22c55e"; bg="#22c55e15"; tc="#22c55e"; } else if (sel) { bc="#ef4444"; bg="#ef444415"; tc="#ef4444"; } else { bc="var(--border)"; bg="var(--card)"; tc="var(--t2)"; } }
                          return (
                            <button key={i} onClick={() => { if (marpolFeedback) return; setMarpolSelected(p => p.includes(opt) ? p.filter(x=>x!==opt) : [...p,opt]); }} disabled={!!marpolFeedback}
                              style={{ padding:"8px 14px", borderRadius:"8px", border:`1.5px solid ${bc}`, background:bg, color:tc, fontWeight:500, fontSize:"13px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s" }}>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {!marpolFeedback && (
                        <button onClick={marpolSubmitSelectAll} disabled={marpolSelected.length === 0}
                          style={{ marginTop:"12px", ...accentBtn, width:"100%", opacity: marpolSelected.length === 0 ? 0.45 : 1 }}>
                          {marpolSelected.length === 0 ? "Tap options to select" : `Check ${marpolSelected.length} selected`}
                        </button>
                      )}
                      {marpolFeedback && (
                        <>
                          {renderFeedbackBar(marpolFeedback, null)}
                          {marpolFeedback === "incorrect" && (
                            <div style={{ fontSize:"12px", color:"var(--t3)", marginTop:"-6px", marginBottom:"8px" }}>Green = correct answer &nbsp;·&nbsp; Red = wrong selection</div>
                          )}
                          <button className="quiz-next-btn" onClick={marpolNext}>{quizPos+1 >= quizOrder.length ? "See Results →" : "Next →"}</button>
                        </>
                      )}
                    </>
                  )}

                  {/* ── SORT ── */}
                  {item.type === "sort" && (
                    <>
                      <div className="quiz-question-card mc-question-card" key={quizPos}>
                        <div className="quiz-class-label">SORT IT</div>
                        <div className="mc-question-text">{item.q}</div>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                        {item.items.map((si, i) => {
                          const assigned = marpolSortState[i];
                          let cardBorder = assigned ? "var(--accent)" : "var(--border)";
                          if (marpolFeedback) cardBorder = assigned === si.cat ? "#22c55e" : "#ef4444";
                          return (
                            <div key={i} style={{ padding:"12px 14px", borderRadius:"10px", border:`1.5px solid ${cardBorder}`, background:"var(--card)", transition:"border-color 0.15s" }}>
                              <div style={{ fontSize:"13px", fontWeight:500, color:"var(--t1)", marginBottom: marpolFeedback ? 6 : 8 }}>{si.text}</div>
                              {!marpolFeedback ? (
                                <div style={{ display:"flex", gap:"6px" }}>
                                  {item.categories.map(cat => (
                                    <button key={cat} onClick={() => setMarpolSortState(p => ({ ...p, [i]:cat }))}
                                      style={{ flex:1, padding:"5px 8px", borderRadius:"7px", border:"none", background: assigned===cat ? "var(--accent)" : "var(--border)", color: assigned===cat ? "#fff" : "var(--t2)", fontSize:"12px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s" }}>
                                      {cat}
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <div style={{ fontSize:"12px", fontWeight:600, color: assigned===si.cat ? "#22c55e" : "#ef4444" }}>
                                  {assigned===si.cat ? `✓ ${assigned}` : `✗ ${assigned || "unassigned"} → correct: ${si.cat}`}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {!marpolFeedback && (
                        <button onClick={marpolSubmitSort} disabled={!allSortAssigned}
                          style={{ marginTop:"12px", ...accentBtn, width:"100%", opacity: allSortAssigned ? 1 : 0.45 }}>
                          {allSortAssigned ? "Check Answers" : "Assign all items to continue"}
                        </button>
                      )}
                      {marpolFeedback && <>{renderFeedbackBar(marpolFeedback, null)}<button className="quiz-next-btn" onClick={marpolNext}>{quizPos+1 >= quizOrder.length ? "See Results →" : "Next →"}</button></>}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (view === "part-a-quiz") {
    const data = getQuizData(quizId);
    const cfg  = QUIZ_CONFIG[quizId] || QUIZ_CONFIG.imdg;
    const currentItem = quizDone ? null : data[quizOrder[quizPos]];
    const pct = quizDone ? 100 : Math.round((quizPos / quizOrder.length) * 100);
    return (
      <>
        <style>{styles}</style>
        <div data-theme={theme} style={{ fontFamily:"'DM Sans',sans-serif", background:"var(--bg)", minHeight:"100vh", color:"var(--t1)", position:"relative", overflow:"hidden", transition:"background 0.3s, color 0.3s" }}>
          {themeToggle}
          <div className="dark-pattern"/><div className="light-pattern"/>
          <div key={viewKey} className="quiz-page view-enter" style={{ paddingTop:"40px" }}>
            <div className="quiz-container">
              {/* Header */}
              <div className="quiz-header">
                <button onClick={() => changeView("part-a")} style={{ background:"none", border:"none", color:"var(--t3)", fontSize:"12px", fontFamily:"'Space Mono',monospace", letterSpacing:"1px", cursor:"pointer", padding:0, transition:"color 0.15s" }}
                  onMouseOver={e=>e.currentTarget.style.color="var(--t2)"} onMouseOut={e=>e.currentTarget.style.color="var(--t3)"}>
                  {cfg.backLabel}
                </button>
                {!quizDone && <div className="quiz-progress-label">{quizPos + 1} / {quizOrder.length}</div>}
                <div className="quiz-score-label">{quizScore.correct} / {quizScore.total} correct</div>
              </div>

              {/* Progress bar */}
              {!quizDone && (
                <div className="quiz-progress-bar">
                  <div className="quiz-progress-fill" style={{ width:`${pct}%` }}/>
                </div>
              )}

              {quizDone ? (
                /* Results screen */
                <div className="quiz-done-card" style={{ animation:"examSetupEnter 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
                  <div style={{ fontSize:"36px", marginBottom:"8px" }}>{quizScore.correct === quizScore.total ? "🎉" : quizScore.correct >= quizScore.total * 0.7 ? "👍" : "📖"}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", color:"var(--t3)", marginBottom:"4px" }}>Final Score</div>
                  <div className="quiz-done-score">{quizScore.correct}<span style={{ fontSize:"0.5em", color:"var(--t2)" }}>/{quizScore.total}</span></div>
                  <div style={{ color:"var(--t2)", marginBottom:"28px", fontSize:"14px" }}>
                    {quizScore.correct === quizScore.total ? `Perfect — ${cfg.doneText}` : `${Math.round((quizScore.correct/quizScore.total)*100)}% correct`}
                  </div>
                  <div style={{ display:"flex", gap:"10px" }}>
                    <button onClick={() => startQuiz(quizId, quizMode)} style={{ flex:1, padding:"12px", borderRadius:"10px", border:"none", background:"var(--accent)", color:"#fff", fontWeight:700, fontSize:"14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Try Again</button>
                    {quizId !== "solas-numbers" && (
                      <button onClick={() => startQuiz(quizId, quizMode==="ordered"?"random":"ordered")} style={{ flex:1, padding:"12px", borderRadius:"10px", border:"1.5px solid var(--border)", background:"var(--card)", color:"var(--t1)", fontWeight:600, fontSize:"14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                        {quizMode==="ordered" ? "Try Random" : "Try In Order"}
                      </button>
                    )}
                  </div>
                  <button onClick={() => changeView("part-a")} style={{ marginTop:"10px", width:"100%", padding:"10px", borderRadius:"10px", border:"none", background:"none", color:"var(--t3)", fontSize:"13px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>← Back to Quizzes</button>
                </div>
              ) : (
                <>
                  {cfg.type === "mc" ? (
                    /* ── MULTIPLE CHOICE MODE ── */
                    <>
                      {quizId === "pilot" && (
                        <div style={{ textAlign:"center", marginBottom:"10px" }}>
                          <button className="poster-btn" onClick={() => setShowPoster(true)}>
                            📋 Show IMPA Poster
                          </button>
                        </div>
                      )}
                      <div className="quiz-question-card mc-question-card" key={quizPos}>
                        <div className="quiz-class-label">{cfg.label}</div>
                        {currentItem.section && (
                          <div className="mc-section-label">{currentItem.section}</div>
                        )}
                        <div className="mc-question-text">{currentItem.q}</div>
                      </div>

                      {quizId === "solas-numbers" ? (
                        /* ── SOLAS Numbers: full 17-option grid ── */
                        <div className="solas-num-grid">
                          {currentItem.options.map((opt, i) => {
                            let cls = "solas-num-btn";
                            if (quizFeedback) {
                              if (opt === currentItem.correct) cls += " solas-num-btn-correct";
                              else if (opt === quizAnswer)     cls += " solas-num-btn-wrong";
                            }
                            return (
                              <button key={i} className={cls}
                                onClick={() => selectMCOption(opt)}
                                disabled={!!quizFeedback}>
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        /* ── Standard 4-option vertical list ── */
                        <div className="mc-options">
                          {currentItem.options.map((opt, i) => {
                            let state = "idle";
                            if (quizFeedback) {
                              if (opt === currentItem.correct) state = "correct";
                              else if (opt === quizAnswer)      state = "wrong";
                            }
                            return (
                              <button key={i} className={`mc-option mc-option-${state}`}
                                onClick={() => selectMCOption(opt)}
                                disabled={!!quizFeedback}>
                                <span className="mc-letter">{["A","B","C","D"][i]}</span>
                                <span className="mc-opt-text">{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {quizFeedback && (
                        <>
                          <div className={`quiz-feedback ${quizFeedback}`}>
                            <div className="quiz-feedback-icon">{quizFeedback==="correct" ? "✅" : "❌"}</div>
                            <div className="quiz-feedback-answer" style={{ color: quizFeedback==="correct" ? "var(--confident)" : "#ef4444", fontWeight:600 }}>
                              {quizFeedback==="correct" ? "Correct!" : "Not quite — the correct answer is highlighted above."}
                            </div>
                          </div>
                          <button className="quiz-next-btn" onClick={nextQuizQuestion}>
                            {quizPos + 1 >= quizOrder.length ? "See Results →" : "Next →"}
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    /* ── TEXT INPUT MODE ── */
                    <>
                      <div className="quiz-question-card" key={quizPos}>
                        <div className="quiz-class-label">{cfg.label}</div>
                        <div className="quiz-class-number">{currentItem.id}</div>
                        {currentItem.img && (
                          <img src={currentItem.img} alt={`Class ${currentItem.id} placard`} className="quiz-class-img" />
                        )}
                        <div className="quiz-class-question">{cfg.question}</div>
                      </div>

                      {/* Hint (SOLAS only) */}
                      {currentItem.hint && !quizFeedback && (
                        <div style={{ textAlign:"center", marginBottom:"10px" }}>
                          <button className="hint-btn" onClick={() => setShowHint(h => !h)}>
                            {showHint ? "🙈 Hide Hint" : "💡 Show Hint"}
                          </button>
                        </div>
                      )}
                      {showHint && currentItem.hint && !quizFeedback && (
                        <div className="hint-card">
                          {currentItem.hint.split(/(\{[^}]+\})/).map((part, i) => {
                            if (part.startsWith("{") && part.endsWith("}")) {
                              const word = part.slice(1, -1);
                              return <span key={i} className="hint-blank">{"_".repeat(word.length)}</span>;
                            }
                            return <span key={i}>{part}</span>;
                          })}
                        </div>
                      )}

                      {/* Feedback */}
                      {quizFeedback && (
                        <div className={`quiz-feedback ${quizFeedback}`}>
                          <div className="quiz-feedback-icon">{quizFeedback==="correct" ? "✅" : "❌"}</div>
                          <div className="quiz-feedback-answer" style={{ color: quizFeedback==="correct" ? "var(--confident)" : "#ef4444", fontWeight:600, marginBottom:quizFeedback==="incorrect"?6:0 }}>
                            {quizFeedback==="correct" ? "Correct!" : "Not quite."}
                          </div>
                          {quizFeedback==="incorrect" && (
                            <div style={{ fontSize:"14px", color:"var(--t1)", lineHeight:1.55 }}>
                              <span style={{ color:"var(--t3)", fontSize:"12px" }}>Correct answer: </span><br/>
                              <strong>{currentItem.name}</strong>
                            </div>
                          )}
                        </div>
                      )}

                      {!quizFeedback ? (
                        <>
                          <input
                            ref={quizInputRef}
                            className="quiz-input"
                            type="text"
                            placeholder={cfg.placeholder}
                            value={quizAnswer}
                            onChange={e => setQuizAnswer(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") submitQuizAnswer(); }}
                            autoFocus
                          />
                          <button className="quiz-submit-btn" onClick={submitQuizAnswer} disabled={!quizAnswer.trim()}>
                            Submit
                          </button>
                        </>
                      ) : (
                        <button className="quiz-next-btn" onClick={nextQuizQuestion}>
                          {quizPos + 1 >= quizOrder.length ? "See Results →" : "Next →"}
                        </button>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ── IMPA Poster Overlay ── */}
          {showPoster && (
            <div className="poster-overlay">
              <div className="poster-overlay-header">
                <span className="poster-overlay-title">📋 IMPA Pilot Ladder Poster</span>
                <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                  <a href="https://www.impahq.org/sites/default/files/2021-04/Pilot%20Ladder%20Poster.pdf"
                    target="_blank" rel="noopener noreferrer" className="poster-newtab-btn">
                    Open in new tab ↗
                  </a>
                  <button onClick={() => setShowPoster(false)} className="poster-close-btn">✕</button>
                </div>
              </div>
              <div className="poster-frame-wrap">
                <iframe
                  src="/quiz-images/pilot-ladder-poster.pdf"
                  className="poster-frame"
                  title="IMPA Pilot Ladder Poster"
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  // HOME
  if (view === "home") {
    return (
      <>
        <style>{styles}</style>
        <div data-theme={theme} style={{ fontFamily:"'DM Sans',sans-serif", background:"var(--bg)", minHeight:"100vh", color:"var(--t1)", position:"relative", overflow:"hidden", transition:"background 0.3s, color 0.3s" }}>
          {themeToggle}
          <div style={{ position:"fixed",inset:0,opacity:0.03,zIndex:0, backgroundImage:`radial-gradient(circle at 1px 1px,var(--dot) 1px,transparent 0)`, backgroundSize:"32px 32px" }}/>
          <div className="dark-pattern"/><div className="light-pattern"/>
          <div style={{ position:"fixed",top:0,left:0,right:0,height:"300px", background:theme === "light" ? `radial-gradient(ellipse at 50% -20%,rgba(51,87,101,var(--glow-opacity)) 0%,transparent 70%)` : `radial-gradient(ellipse at 50% -20%,rgba(32,192,200,var(--glow-opacity)) 0%,transparent 70%)`, zIndex:0 }}/>

          <div key={viewKey} className="home-container view-enter">
            {/* Back to landing */}
            <button onClick={() => changeView("landing")} style={{ background:"none", border:"none", color:"var(--t3)", fontSize:"12px", fontFamily:"'Space Mono',monospace", letterSpacing:"1px", cursor:"pointer", padding:"0 0 24px 0", display:"flex", alignItems:"center", gap:"6px", transition:"color 0.15s" }}
              onMouseOver={e=>e.currentTarget.style.color="var(--t2)"}
              onMouseOut={e=>e.currentTarget.style.color="var(--t3)"}>
              ← PART B
            </button>
            {/* Title + Daily Question side by side on desktop */}
            <div className="header-row">
              <div className="home-header">
                <div style={{ fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"4px",textTransform:"uppercase",color:"var(--accent)",marginBottom:"12px",fontWeight:700 }}>OOW UNLIMITED</div>
                <h1 className="main-title" style={{ fontSize:"clamp(28px,5vw,44px)",fontWeight:700,lineHeight:1.15,marginBottom:"12px" }}>
                  Oral Exam<br/>Question Bank
                </h1>
                <p style={{ color:"var(--t2)",fontSize:"15px",lineHeight:1.6 }}>
                  <span style={{ fontFamily:"'Space Mono',monospace",color:"var(--accent)",fontWeight:700 }}>{totalQuestions}</span> questions across{" "}
                  <span style={{ fontFamily:"'Space Mono',monospace",color:"var(--accent)",fontWeight:700 }}>{categories.length}</span> topics, sourced from real oral exam reports.
                </p>
                <button onClick={() => changeView("stats")} style={{
                  background:theme === "light" ? "#2d8a6e14" : "#10b98115",border:`1px solid ${theme === "light" ? "#2d8a6e50" : "#10b98140"}`,borderRadius:"8px",
                  padding:"7px 14px",fontSize:"12px",fontWeight:600,cursor:"pointer",
                  fontFamily:"'DM Sans',sans-serif",color:theme === "light" ? "#2d8a6e" : "#10b981",transition:"all 0.15s",
                  display:"inline-flex",alignItems:"center",gap:"6px",marginTop:"12px"
                }}
                onMouseOver={e=>{e.currentTarget.style.background=theme === "light" ? "#2d8a6e22" : "#10b98125";e.currentTarget.style.borderColor=theme === "light" ? "#2d8a6e" : "#10b981"}}
                onMouseOut={e=>{e.currentTarget.style.background=theme === "light" ? "#2d8a6e14" : "#10b98115";e.currentTarget.style.borderColor=theme === "light" ? "#2d8a6e50" : "#10b98140"}}>
                  📊 Progress Dashboard
                </button>
              </div>

              {/* Daily Question with stock photo background */}
              {dailyQ && showDaily && (() => {
                const photoId = CATEGORY_PHOTOS[dailyQ.cat];
                const photoUrl = photoId
                  ? `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=900&q=75`
                  : null;
                return (
                  <div className="daily-card">
                    <div className="daily-card-inner" style={{
                      backgroundImage: photoUrl
                        ? `linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%), url(${photoUrl})`
                        : "linear-gradient(135deg, var(--daily-bg-from) 0%, var(--daily-bg-to) 100%)",
                      backgroundSize: "cover", backgroundPosition: "center",
                      border: photoUrl ? "none" : `1px solid ${theme === "light" ? "#d4b21240" : "#f59e0b40"}`,
                      borderRadius: "14px", padding: "18px 20px", height: "100%",
                      position: "relative", animation: "fadeIn 0.5s ease",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                      display: "flex", flexDirection: "column", justifyContent: "center"
                    }}>
                      <button onClick={() => setShowDaily(false)} style={{
                        position: "absolute", top: "10px", right: "12px",
                        background: "none", border: "none", color: photoUrl ? "rgba(255,255,255,0.7)" : "var(--t3)",
                        fontSize: "18px", cursor: "pointer", lineHeight: 1
                      }}>×</button>
                      <div style={{
                        display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px"
                      }}>
                        <span style={{ fontSize: "14px" }}>⚡</span>
                        <span style={{
                          fontFamily: "'Space Mono',monospace", fontSize: "10px",
                          letterSpacing: "2px", textTransform: "uppercase",
                          color: photoUrl ? "#fbbf24" : (theme === "light" ? "#d4b212" : "#f59e0b"), fontWeight: 700
                        }}>Question of the Day</span>
                      </div>
                      <p style={{
                        fontSize: "clamp(14px, 2.5vw, 17px)", fontWeight: 600,
                        lineHeight: 1.5, color: photoUrl ? "#fff" : "var(--t1)", marginBottom: "10px",
                        textShadow: photoUrl ? "0 1px 4px rgba(0,0,0,0.4)" : "none"
                      }}>
                        {dailyQ.q}
                      </p>
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        background: photoUrl ? "rgba(255,255,255,0.15)" : `${CATEGORY_COLORS[dailyQ.cat] || "#3b82f6"}15`,
                        backdropFilter: photoUrl ? "blur(8px)" : "none",
                        borderRadius: "6px", padding: "4px 10px", alignSelf: "flex-start"
                      }}>
                        <span style={{ fontSize: "12px" }}>{CATEGORY_ICONS[dailyQ.cat] || "📋"}</span>
                        <span style={{
                          fontFamily: "'Space Mono',monospace", fontSize: "10px",
                          color: photoUrl ? "#fff" : (CATEGORY_COLORS[dailyQ.cat] || "#3b82f6"), fontWeight: 700
                        }}>{dailyQ.cat}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Action buttons row */}
            <div className="hero-row">
              <div className="hero-right">
                <button className="hero-btn" onClick={startPractice} style={{
                  background:"var(--accent)",
                  boxShadow:theme === "light" ? "0 4px 20px rgba(51,87,101,0.25)" : "0 4px 20px rgba(32,192,200,0.3)"
                }}
                onMouseOver={e=>e.currentTarget.style.transform="translateY(-2px)"}
                onMouseOut={e=>e.currentTarget.style.transform="none"}>
                  <span>{confidenceFilter !== "all"
                    ? `Go — ${selectedCount} ${confidenceFilter === "review" ? "Review" : confidenceFilter === "confident" ? "Confident" : confidenceFilter === "bookmarked" ? "Bookmarked" : "Untagged"} Questions`
                    : selectedCats.length > 0 ? `Go — ${selectedCount} Questions` : `Go — All ${totalQuestions} Questions`}</span>
                </button>
                <button className="hero-btn" onClick={() => { setShowThemes(!showThemes); setExpandedTheme(null); }} style={{
                  background: showThemes
                    ? (theme === "light" ? "#d4b212" : "#0e7090")
                    : (theme === "light" ? "linear-gradient(135deg, #e8a824 0%, #d4652a 100%)" : "linear-gradient(135deg, #0e7090 0%, #18a8c0 100%)"),
                  boxShadow: showThemes ? "none" : (theme === "light" ? "0 4px 24px rgba(232,168,36,0.35)" : "0 4px 24px rgba(14,112,144,0.4)")
                }}
                onMouseOver={e=>{ if(!showThemes) e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseOut={e=>e.currentTarget.style.transform="none"}>
                  <span>{showThemes ? "Hide Themes & References" : "📚 Major Themes & References"}</span>
                  {!showThemes && <span className="hero-btn-sub">⚠ MUST READ!</span>}
                </button>
                <button className="hero-btn" onClick={() => changeView("exam-setup")} style={{
                  background: theme === "light"
                    ? "linear-gradient(135deg, #335765 0%, #1a7a6d 50%, #2d8a6e 100%)"
                    : "linear-gradient(135deg, #1e3880 0%, #3a5ec8 100%)",
                  boxShadow: theme === "light" ? "0 4px 20px rgba(51,87,101,0.25)" : "0 4px 20px rgba(30,56,128,0.4)"
                }}
                onMouseOver={e=>e.currentTarget.style.transform="translateY(-2px)"}
                onMouseOut={e=>e.currentTarget.style.transform="none"}>
                  <span>🎯 Exam Simulation</span>
                  <span className="hero-btn-sub">20 Qs · 30 Min · Weighted</span>
                </button>
              </div>
            </div>

            {/* THEMES SECTION */}
            {showThemes && (
              <div style={{ marginBottom:"28px", animation:"fadeIn 0.3s ease" }}>
                <div className="themes-grid">
                  {Object.entries(THEMES).map(([title, items]) => {
                    const isOpen = expandedTheme === title;
                    const icon = THEME_ICONS[title] || "📌";
                    const isTips = title.includes("Examiner Tips");
                    const isMNotices = title.includes("M-Notices");
                    const isLong = isMNotices || items.length > 20;
                    return (
                      <div key={title} className={`theme-card${isTips ? " tips-card" : ""}${isLong ? " full-width" : ""}`}>
                        <button className="theme-card-header" onClick={() => setExpandedTheme(isOpen ? null : title)}>
                          <span className="theme-section-icon">{icon}</span>
                          <span className="theme-section-title">{title}</span>
                          <span className="theme-badge">{items.length}</span>
                          <span className="theme-chevron" style={{ transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
                        </button>
                        {isOpen && (
                          <div className="theme-card-body">
                            <div className="theme-card-body-inner">
                              {isMNotices ? (
                                // Group M-Notices by type (MGN, MSN, MIN)
                                (() => {
                                  const groups = { MGN: [], MSN: [], MIN: [] };
                                  items.forEach(item => {
                                    const type = item.startsWith("MGN") ? "MGN" : item.startsWith("MSN") ? "MSN" : item.startsWith("MIN") ? "MIN" : "MGN";
                                    groups[type].push(item);
                                  });
                                  return Object.entries(groups).filter(([,v]) => v.length > 0).map(([type, notices]) => (
                                    <div key={type}>
                                      <div className="mnotice-group">{type}s — {type === "MGN" ? "Marine Guidance Notes" : type === "MSN" ? "Merchant Shipping Notices" : "Marine Information Notes"} ({notices.length})</div>
                                      {notices.map((item, i) => {
                                        const parts = item.split(" — ");
                                        return (
                                          <div key={i} className="theme-item">
                                            <span className="bullet">●</span>
                                            <span className="desc">
                                              {parts.length > 1 ? (
                                                <><span className="key">{parts[0]}</span> — {parts.slice(1).join(" — ")}</>
                                              ) : item}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ));
                                })()
                              ) : (
                                items.map((item, i) => {
                                  const parts = item.split(" — ");
                                  return (
                                    <div key={i} className="theme-item">
                                      <span className="bullet">●</span>
                                      <span className="desc">
                                        {parts.length > 1 ? (
                                          <><span className="key">{parts[0]}</span> — {parts.slice(1).join(" — ")}</>
                                        ) : item}
                                      </span>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Confidence filter */}
            {(hasAnyTags || confidenceFilter !== "all") && (
              <div className="confidence-filter">
                <span className="confidence-filter-label">Filter:</span>
                <button className={`cf-btn${confidenceFilter === "all" ? " active" : ""}`}
                  onClick={() => setConfidenceFilter("all")}>
                  All
                </button>
                <button className={`cf-btn${confidenceFilter === "review" ? " active-review" : ""}`}
                  onClick={() => setConfidenceFilter("review")}>
                  <span className="tag-dot review"/> Needs Review
                  {confidenceStats.review > 0 && <span className="cf-count">{confidenceStats.review}</span>}
                </button>
                <button className={`cf-btn${confidenceFilter === "confident" ? " active-confident" : ""}`}
                  onClick={() => setConfidenceFilter("confident")}>
                  <span className="tag-dot confident"/> Confident
                  {confidenceStats.confident > 0 && <span className="cf-count">{confidenceStats.confident}</span>}
                </button>
                <button className={`cf-btn${confidenceFilter === "untagged" ? " active" : ""}`}
                  onClick={() => setConfidenceFilter("untagged")}>
                  Untagged
                  <span className="cf-count">{confidenceStats.untagged}</span>
                </button>
                {(hasAnyBookmarks || confidenceFilter === "bookmarked") && (
                  <button className={`cf-btn${confidenceFilter === "bookmarked" ? " active" : ""}`}
                    onClick={() => setConfidenceFilter("bookmarked")}>
                    Bookmarked
                    {confidenceStats.bookmarked > 0 && <span className="cf-count">{confidenceStats.bookmarked}</span>}
                  </button>
                )}
              </div>
            )}

            {/* Quick actions strip */}
            {selectionSummary && (
              <div className="quick-actions-strip">
                <div className="quick-actions-info">
                  <span className="qa-stat">{selectionSummary.topicCount} topic{selectionSummary.topicCount !== 1 ? "s" : ""}</span>
                  <span className="qa-dot">&middot;</span>
                  <span className="qa-stat">{selectionSummary.total} questions</span>
                  {selectionSummary.reviewCount > 0 && (
                    <>
                      <span className="qa-dot">&middot;</span>
                      <span className="qa-stat qa-review">{selectionSummary.reviewCount} needs review</span>
                    </>
                  )}
                  {selectionSummary.bookmarkedCount > 0 && (
                    <>
                      <span className="qa-dot">&middot;</span>
                      <span className="qa-stat qa-bookmarked">{selectionSummary.bookmarkedCount} bookmarked</span>
                    </>
                  )}
                </div>
                {selectionSummary.reviewCount > 0 && (
                  <button className="qa-drill-btn" onClick={drillWeakSpots}>
                    Drill Weak Spots
                  </button>
                )}
              </div>
            )}

            {/* Filter + controls */}
            <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px",flexWrap:"wrap" }}>
              <input type="text" placeholder="Filter topics..." value={filterText} onChange={e=>setFilterText(e.target.value)}
                style={{ flex:1,minWidth:"160px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:"8px",padding:"10px 14px",color:"var(--t1)",fontSize:"14px",fontFamily:"'DM Sans',sans-serif",outline:"none" }}/>
              <button onClick={()=>setSelectedCats([...categories])} style={{ background:"transparent",border:"1px solid var(--border)",borderRadius:"8px",padding:"9px 14px",color:"var(--t2)",fontSize:"13px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif" }}>All</button>
              <button onClick={()=>setSelectedCats([])} style={{ background:"transparent",border:"1px solid var(--border)",borderRadius:"8px",padding:"9px 14px",color:"var(--t2)",fontSize:"13px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif" }}>Clear</button>
            </div>

            {/* Category grid */}
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"10px" }}>
              {filteredCategories.map((cat, i) => {
                const sel = selectedCats.includes(cat);
                const count = QUESTIONS[cat].length;
                const color = CATEGORY_COLORS[cat]||"#3b82f6";
                const icon = CATEGORY_ICONS[cat]||"📋";
                // Per-category confidence stats
                const catQs = QUESTIONS[cat] || [];
                let catConf = 0, catRev = 0;
                catQs.forEach(q => {
                  const tag = allTags[noteKey({ ...q, cat })];
                  if (tag === "confident") catConf++;
                  else if (tag === "review") catRev++;
                });
                const catTagged = catConf + catRev;
                const confPct = count > 0 ? Math.round((catConf / count) * 100) : 0;
                const revPct = count > 0 ? Math.round((catRev / count) * 100) : 0;
                const hasProgress = catTagged > 0;
                return (
                  <button key={cat} onClick={()=>toggleCat(cat)}
                    style={{
                      background: sel ? blendHex(color, theme==="dark"?"#111827":"#ffffff", 0.18) : "var(--card)",
                      border:`1.5px solid ${sel ? color : "var(--border)"}`,
                      borderRadius:"12px",padding:"14px 16px",cursor:"pointer",textAlign:"left",
                      transition:"all 0.15s",animation:`fadeIn 0.4s ease ${i*0.025}s both`,
                      display:"flex",alignItems:"center",gap:"12px",
                      position:"relative",overflow:"hidden"
                    }}
                    onMouseOver={e=>{if(!sel)e.currentTarget.style.borderColor=`${color}60`;e.currentTarget.style.background=sel?blendHex(color,theme==="dark"?"#111827":"#ffffff",0.25):"var(--card-h)"}}
                    onMouseOut={e=>{e.currentTarget.style.borderColor=sel?color:"var(--border)";e.currentTarget.style.background=sel?blendHex(color,theme==="dark"?"#111827":"#ffffff",0.18):"var(--card)"}}>
                    <span style={{fontSize:"20px",flexShrink:0}}>{icon}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:"14px",fontWeight:600,color:sel?color:"var(--t1)",lineHeight:1.3}}>{cat}</div>
                      <div style={{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"var(--t3)",marginTop:"2px",display:"flex",alignItems:"center",gap:"6px"}}>
                        {count} question{count!==1?"s":""}
                        {hasProgress && (
                          <span style={{display:"inline-flex",alignItems:"center",gap:"5px",marginLeft:"4px"}}>
                            {catConf > 0 && <span style={{color:theme === "light" ? "#2d8a6e" : "#10b981",fontSize:"11px",fontWeight:700}}>✓{catConf}</span>}
                            {catRev > 0 && <span style={{color:theme === "light" ? "#d4b212" : "#f59e0b",fontSize:"11px",fontWeight:700}}>⟳{catRev}</span>}
                          </span>
                        )}
                      </div>
                      {hasProgress && (
                        <div style={{display:"flex",height:"3px",borderRadius:"2px",marginTop:"6px",overflow:"hidden",background:"var(--border)",gap:"1px"}}>
                          {confPct > 0 && <div style={{width:`${confPct}%`,background:theme === "light" ? "#2d8a6e" : "#10b981",borderRadius:"2px",transition:"width 0.3s"}}/>}
                          {revPct > 0 && <div style={{width:`${revPct}%`,background:theme === "light" ? "#d4b212" : "#f59e0b",borderRadius:"2px",transition:"width 0.3s"}}/>}
                        </div>
                      )}
                    </div>
                    {sel && <div style={{width:"20px",height:"20px",borderRadius:"6px",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",color:"#fff",fontWeight:700,flexShrink:0}}>✓</div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }


  // STATS DASHBOARD
  if (view === "stats") {
    const totalSessions = practiceHistory.length;
    const totalQsSeen = practiceHistory.reduce((s, h) => s + h.questionsCount, 0);
    // Study streak
    const uniqueDays = new Set(practiceHistory.map(h => h.date));
    let streak = 0;
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      const dayStr = d.toISOString().split("T")[0];
      if (uniqueDays.has(dayStr)) { streak++; d.setDate(d.getDate() - 1); }
      else break;
    }
    // Per-topic confidence
    const topicStats = categories.map(cat => {
      const qs = QUESTIONS[cat] || [];
      let conf = 0, rev = 0, bm = 0;
      qs.forEach(q => {
        const key = noteKey({ ...q, cat });
        const tag = allTags[key];
        if (tag === "confident") conf++;
        else if (tag === "review") rev++;
        if (allBookmarks[key]) bm++;
      });
      return { cat, total: qs.length, conf, rev, bm, pct: qs.length > 0 ? Math.round((conf / qs.length) * 100) : 0 };
    }).sort((a, b) => b.pct - a.pct);

    return (
      <>
        <style>{styles}</style>
        <div data-theme={theme} style={{ fontFamily:"'DM Sans',sans-serif", background:"var(--bg)", minHeight:"100vh", color:"var(--t1)", position:"relative", transition:"background 0.3s, color 0.3s" }}>
          {themeToggle}
          <div style={{ position:"fixed",inset:0,opacity:0.03,zIndex:0, backgroundImage:`radial-gradient(circle at 1px 1px,var(--dot) 1px,transparent 0)`, backgroundSize:"32px 32px" }}/>
          <div className="dark-pattern"/><div className="light-pattern"/>
          <div style={{ position:"fixed",top:0,left:0,right:0,height:"300px", background:theme === "light" ? `radial-gradient(ellipse at 50% -20%,rgba(51,87,101,var(--glow-opacity)) 0%,transparent 70%)` : `radial-gradient(ellipse at 50% -20%,rgba(32,192,200,var(--glow-opacity)) 0%,transparent 70%)`, zIndex:0 }}/>
          <div key={viewKey} className="home-container view-enter">
            <button onClick={() => changeView("home")} style={{
              background:"var(--card)", border:"1px solid var(--border)", borderRadius:"8px",
              padding:"8px 16px", color:"var(--t2)", fontSize:"13px", cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif", marginBottom:"24px", transition:"all 0.15s"
            }}
            onMouseOver={e=>e.currentTarget.style.borderColor="var(--t3)"}
            onMouseOut={e=>e.currentTarget.style.borderColor="var(--border)"}>
              Back to Topics
            </button>
            <h2 style={{ fontSize:"28px", fontWeight:700, marginBottom:"8px", animation:"fadeIn 0.4s ease" }}>Progress Dashboard</h2>
            <p style={{ color:"var(--t2)", fontSize:"14px", marginBottom:"32px" }}>Your study stats at a glance</p>
            <div className="stats-grid" style={{ animation:"fadeIn 0.5s ease" }}>
              <div className="stat-card">
                <div className="stat-value">{totalSessions}</div>
                <div className="stat-label">Sessions</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{totalQsSeen}</div>
                <div className="stat-label">Questions Seen</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color:"var(--accent)" }}>{streak}</div>
                <div className="stat-label">Day Streak</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color:"var(--confident)" }}>
                  {totalQuestions > 0 ? Math.round((Object.values(allTags).filter(t => t === "confident").length / totalQuestions) * 100) : 0}%
                </div>
                <div className="stat-label">Overall Confident</div>
              </div>
            </div>
            <h3 style={{ fontSize:"16px", fontWeight:700, marginBottom:"16px", marginTop:"12px" }}>Confidence by Topic</h3>
            <div className="topic-stats" style={{ animation:"fadeIn 0.6s ease" }}>
              {topicStats.map(ts => {
                const tsColor = CATEGORY_COLORS[ts.cat] || "#3b82f6";
                const tsIcon = CATEGORY_ICONS[ts.cat] || "?";
                const revPct = ts.total > 0 ? Math.round((ts.rev / ts.total) * 100) : 0;
                return (
                  <div key={ts.cat} className="topic-stat-row">
                    <div className="topic-stat-label">
                      <span>{tsIcon}</span>
                      <span className="topic-stat-name">{ts.cat}</span>
                      <span className="topic-stat-nums">{ts.conf}/{ts.total}</span>
                    </div>
                    <div className="topic-stat-bar-bg">
                      {ts.pct > 0 && <div className="topic-stat-bar-fill" style={{ width:`${ts.pct}%`, background:tsColor }}/>}
                      {revPct > 0 && <div className="topic-stat-bar-fill" style={{ width:`${revPct}%`, background:theme === "light" ? "#d4b212" : "#f59e0b" }}/>}
                    </div>
                    <span className="topic-stat-pct">{ts.pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  // EXAM SETUP
  if (view === "exam-setup") {
    return (
      <>
        <style>{styles}</style>
        <div data-theme={theme} style={{ fontFamily:"'DM Sans',sans-serif", background:"var(--bg)", minHeight:"100vh", color:"var(--t1)", position:"relative", transition:"background 0.3s, color 0.3s" }}>
          {themeToggle}
          <div style={{ position:"fixed",inset:0,opacity:0.03,zIndex:0, backgroundImage:`radial-gradient(circle at 1px 1px,var(--dot) 1px,transparent 0)`, backgroundSize:"32px 32px" }}/>
          <div className="dark-pattern"/><div className="light-pattern"/>
          <div style={{ position:"fixed",top:0,left:0,right:0,height:"300px", background:theme === "light" ? `radial-gradient(ellipse at 50% -20%,rgba(51,87,101,var(--glow-opacity)) 0%,transparent 70%)` : `radial-gradient(ellipse at 50% -20%,rgba(32,192,200,var(--glow-opacity)) 0%,transparent 70%)`, zIndex:0 }}/>
          <div key={viewKey} className="exam-setup-container view-enter">
            <button onClick={() => changeView("home")} style={{
              background:"var(--card)", border:"1px solid var(--border)", borderRadius:"8px",
              padding:"8px 16px", color:"var(--t2)", fontSize:"13px", cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif", marginBottom:"32px", transition:"all 0.15s", float:"left"
            }}
            onMouseOver={e=>e.currentTarget.style.borderColor="var(--t3)"}
            onMouseOut={e=>e.currentTarget.style.borderColor="var(--border)"}>
              ← Back
            </button>
            <div style={{ clear:"both" }}/>
            <div style={{ fontSize:"40px", marginBottom:"16px" }}>🎯</div>
            <h2 style={{ fontSize:"clamp(24px,4vw,34px)", fontWeight:700, marginBottom:"8px" }}>Exam Simulation</h2>
            <p style={{ color:"var(--t2)", fontSize:"15px", lineHeight:1.6, marginBottom:"8px", maxWidth:"480px", margin:"0 auto 8px" }}>
              Simulating the MCA OOW Oral Exam with weighted question selection based on real exam intelligence.
            </p>
            <p style={{ color:"var(--t3)", fontSize:"12px", fontFamily:"'Space Mono',monospace", marginBottom:"24px" }}>
              Tips are hidden during the exam and revealed in your results.
            </p>
            <div className="exam-info-grid">
              <div className="exam-info-card">
                <div className="exam-info-icon">📝</div>
                <div className="exam-info-value">20</div>
                <div className="exam-info-label">Questions</div>
                <div style={{ color:"var(--t3)", fontSize:"11px", marginTop:"6px" }}>Weighted by frequency</div>
              </div>
              <div className="exam-info-card">
                <div className="exam-info-icon">⏱️</div>
                <div className="exam-info-value">30</div>
                <div className="exam-info-label">Minutes</div>
                <div style={{ color:"var(--t3)", fontSize:"11px", marginTop:"6px" }}>Countdown timer</div>
              </div>
              <div className="exam-info-card">
                <div className="exam-info-icon">🔀</div>
                <div className="exam-info-value">Real</div>
                <div className="exam-info-label">Exam Feel</div>
                <div style={{ color:"var(--t3)", fontSize:"11px", marginTop:"6px" }}>Curveballs & follow-ons</div>
              </div>
            </div>
            <button onClick={startExam} style={{
              background: theme === "light"
                ? "linear-gradient(135deg, #335765 0%, #1a7a6d 50%, #2d8a6e 100%)"
                : "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%)",
              color:"#fff", border:"none", borderRadius:"14px", padding:"18px 48px",
              fontSize:"18px", fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
              boxShadow: theme === "light" ? "0 6px 30px rgba(51,87,101,0.3)" : "0 6px 30px rgba(32,192,200,0.3)",
              transition:"all 0.2s", letterSpacing:"0.5px"
            }}
            onMouseOver={e=>e.currentTarget.style.transform="translateY(-2px)"}
            onMouseOut={e=>e.currentTarget.style.transform="none"}>
              Start Exam
            </button>
          </div>
        </div>
      </>
    );
  }

  // EXAM
  if (view === "exam" && examQuestions.length > 0) {
    const eq = examQuestions[examIdx];
    if (!eq) { finishExam(); return null; }
    const eqColor = CATEGORY_COLORS[eq.cat] || "#3b82f6";
    const eqIcon = CATEGORY_ICONS[eq.cat] || "📋";
    const timerClass = examTimeLeft <= 60 ? "danger" : examTimeLeft <= 300 ? "warning" : "";
    const currentAnswer = examAnswers[examIdx]?.confidence;
    const isLast = examIdx >= examQuestions.length - 1;

    return (
      <>
        <style>{styles}</style>
        <div data-theme={theme} style={{ fontFamily:"'DM Sans',sans-serif", background:"var(--bg)", minHeight:"100vh", color:"var(--t1)", position:"relative", transition:"background 0.3s, color 0.3s" }}>
          {themeToggle}
          <div style={{ position:"fixed",inset:0,opacity:0.03,zIndex:0, backgroundImage:`radial-gradient(circle at 1px 1px,var(--dot) 1px,transparent 0)`, backgroundSize:"32px 32px" }}/>
          <div className="dark-pattern"/><div className="light-pattern"/>
          <div style={{ position:"fixed",top:0,left:0,right:0,height:"300px", background:`radial-gradient(ellipse at 50% -20%,${eqColor}18 0%,transparent 70%)`, zIndex:0,transition:"background 0.5s" }}/>
          <div key={viewKey} className="exam-container view-enter">
            {/* Top bar */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
              <button onClick={finishExam} style={{
                background:"var(--card)", border:"1px solid var(--border)", borderRadius:"8px",
                padding:"8px 14px", color:"var(--t2)", fontSize:"12px", cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s"
              }}
              onMouseOver={e=>e.currentTarget.style.borderColor="var(--t3)"}
              onMouseOut={e=>e.currentTarget.style.borderColor="var(--border)"}>
                End Exam
              </button>
              <span className={`exam-timer ${timerClass}`}>{formatExamTime(examTimeLeft)}</span>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"13px", color:"var(--t3)" }}>
                {examIdx + 1} / {examQuestions.length}
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ height:"3px", background:"var(--border)", borderRadius:"2px", marginBottom:"28px", overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${((examIdx+1)/examQuestions.length)*100}%`, background:eqColor, borderRadius:"2px", transition:"width 0.3s ease,background 0.5s" }}/>
            </div>

            {/* Question card */}
            <div ref={examCardRef} className="exam-card" style={{
              border:`1px solid ${eqColor}30`,
              boxShadow:`0 4px 40px ${eqColor}08`
            }}>
              {/* Follow-on badge */}
              {eq.isFollowOn && (
                <div className="follow-on-badge" style={{ background:"#d4b21215", color:"#d4b212", border:"1px solid #d4b21230", alignSelf:"flex-start" }}>
                  ↳ Follow-on Question
                </div>
              )}

              {/* Category badge */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:"8px", alignSelf:"flex-start",
                background:`${eqColor}15`, borderRadius:"8px", padding:"6px 12px", marginBottom:"20px"
              }}>
                <span style={{ fontSize:"14px" }}>{eqIcon}</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"11px", color:eqColor, fontWeight:700, letterSpacing:"0.5px" }}>{eq.cat}</span>
              </div>

              {/* Question text */}
              <p style={{ fontSize:"clamp(18px,3.5vw,24px)", fontWeight:500, lineHeight:1.5, color:"var(--t1)" }}>
                {eq.q}
              </p>
            </div>

            {/* Confidence rating */}
            <div className="exam-confidence-row">
              <button className={`exam-conf-btn${currentAnswer === "confident" ? " active-confident" : ""}`}
                onClick={() => setExamAnswers(prev => { const n = [...prev]; n[examIdx] = { confidence: "confident" }; return n; })}>
                ✅ Confident
              </button>
              <button className={`exam-conf-btn${currentAnswer === "unsure" ? " active-unsure" : ""}`}
                onClick={() => setExamAnswers(prev => { const n = [...prev]; n[examIdx] = { confidence: "unsure" }; return n; })}>
                🤔 Unsure
              </button>
              <button className={`exam-conf-btn${currentAnswer === "no-idea" ? " active-no-idea" : ""}`}
                onClick={() => setExamAnswers(prev => { const n = [...prev]; n[examIdx] = { confidence: "no-idea" }; return n; })}>
                ❌ No Idea
              </button>
            </div>

            {/* Next / Finish button */}
            <button onClick={examNext} style={{
              width:"100%", background:eqColor, border:"none", borderRadius:"12px",
              padding:"16px", color:"#fff", fontSize:"16px", fontWeight:600,
              cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
              transition:"transform 0.15s", boxShadow:`0 4px 20px ${eqColor}30`
            }}
            onMouseOver={e=>e.currentTarget.style.transform="translateY(-1px)"}
            onMouseOut={e=>e.currentTarget.style.transform="none"}>
              {isLast ? "Finish Exam" : "Next Question →"}
            </button>

            {/* Shortcuts hint */}
            <div style={{ textAlign:"center", fontSize:"11px", color:"var(--t3)", marginTop:"16px", fontFamily:"'Space Mono',monospace", letterSpacing:"0.3px" }}>
              Enter/→ next · 1/2/3 rate · Esc end
            </div>
          </div>
        </div>
      </>
    );
  }

  // EXAM RESULTS
  if (view === "exam-results") {
    const questionsReached = Math.min(examIdx + 1, examQuestions.length);
    const timeTaken = examStartTime ? Math.round((Date.now() - examStartTime) / 1000) : 0;
    const confidentCount = examAnswers.slice(0, questionsReached).filter(a => a?.confidence === "confident").length;
    const unsureCount = examAnswers.slice(0, questionsReached).filter(a => a?.confidence === "unsure").length;
    const noIdeaCount = examAnswers.slice(0, questionsReached).filter(a => a?.confidence === "no-idea").length;
    const followOnCount = examQuestions.slice(0, questionsReached).filter(q => q.isFollowOn).length;

    // Topic breakdown
    const topicBreakdown = {};
    examQuestions.slice(0, questionsReached).forEach((q, i) => {
      if (!topicBreakdown[q.cat]) topicBreakdown[q.cat] = { total:0, confident:0, unsure:0, noIdea:0 };
      topicBreakdown[q.cat].total++;
      const a = examAnswers[i];
      if (a?.confidence === "confident") topicBreakdown[q.cat].confident++;
      else if (a?.confidence === "unsure") topicBreakdown[q.cat].unsure++;
      else if (a?.confidence === "no-idea") topicBreakdown[q.cat].noIdea++;
    });

    return (
      <>
        <style>{styles}</style>
        <div data-theme={theme} style={{ fontFamily:"'DM Sans',sans-serif", background:"var(--bg)", minHeight:"100vh", color:"var(--t1)", position:"relative", transition:"background 0.3s, color 0.3s" }}>
          {themeToggle}
          <div style={{ position:"fixed",inset:0,opacity:0.03,zIndex:0, backgroundImage:`radial-gradient(circle at 1px 1px,var(--dot) 1px,transparent 0)`, backgroundSize:"32px 32px" }}/>
          <div className="dark-pattern"/><div className="light-pattern"/>
          <div style={{ position:"fixed",top:0,left:0,right:0,height:"300px", background:theme === "light" ? `radial-gradient(ellipse at 50% -20%,rgba(51,87,101,var(--glow-opacity)) 0%,transparent 70%)` : `radial-gradient(ellipse at 50% -20%,rgba(32,192,200,var(--glow-opacity)) 0%,transparent 70%)`, zIndex:0 }}/>
          <div key={viewKey} className="exam-results-container view-enter">
            <div style={{ textAlign:"center", marginBottom:"32px", animation:"fadeIn 0.5s ease" }}>
              <div style={{ fontSize:"48px", marginBottom:"12px" }}>🏁</div>
              <h2 style={{ fontSize:"clamp(24px,4vw,32px)", fontWeight:700, marginBottom:"8px" }}>Exam Complete</h2>
              <p style={{ color:"var(--t2)", fontSize:"14px" }}>
                {questionsReached} questions in {formatExamTime(timeTaken)}
                {followOnCount > 0 && ` · ${followOnCount} follow-on${followOnCount !== 1 ? "s" : ""}`}
              </p>
            </div>

            {/* Summary cards */}
            <div className="stats-grid" style={{ animation:"fadeIn 0.5s ease 0.1s both" }}>
              <div className="stat-card">
                <div className="stat-value">{questionsReached}</div>
                <div className="stat-label">Questions</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color:"var(--confident)" }}>{confidentCount}</div>
                <div className="stat-label">Confident</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color:"#d4b212" }}>{unsureCount}</div>
                <div className="stat-label">Unsure</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color:"#ef4444" }}>{noIdeaCount}</div>
                <div className="stat-label">No Idea</div>
              </div>
            </div>

            {/* Topic breakdown */}
            {Object.keys(topicBreakdown).length > 0 && (
              <div style={{ marginBottom:"28px", animation:"fadeIn 0.5s ease 0.2s both" }}>
                <h3 style={{ fontSize:"16px", fontWeight:700, marginBottom:"14px" }}>Topic Breakdown</h3>
                <div className="topic-stats">
                  {Object.entries(topicBreakdown).sort((a,b) => b[1].total - a[1].total).map(([cat, stats]) => {
                    const tc = CATEGORY_COLORS[cat] || "#3b82f6";
                    const ti = CATEGORY_ICONS[cat] || "📋";
                    const confPct = stats.total > 0 ? Math.round((stats.confident / stats.total) * 100) : 0;
                    const unsurePct = stats.total > 0 ? Math.round((stats.unsure / stats.total) * 100) : 0;
                    const noIdeaPct = stats.total > 0 ? Math.round((stats.noIdea / stats.total) * 100) : 0;
                    return (
                      <div key={cat} className="topic-stat-row">
                        <div className="topic-stat-label">
                          <span>{ti}</span>
                          <span className="topic-stat-name">{cat}</span>
                          <span className="topic-stat-nums">{stats.confident}/{stats.total}</span>
                        </div>
                        <div className="topic-stat-bar-bg">
                          {confPct > 0 && <div className="topic-stat-bar-fill" style={{ width:`${confPct}%`, background:tc }}/>}
                          {unsurePct > 0 && <div className="topic-stat-bar-fill" style={{ width:`${unsurePct}%`, background:"#d4b212" }}/>}
                          {noIdeaPct > 0 && <div className="topic-stat-bar-fill" style={{ width:`${noIdeaPct}%`, background:"#ef4444" }}/>}
                        </div>
                        <span className="topic-stat-pct">{confPct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question-by-question review */}
            <div style={{ marginBottom:"28px", animation:"fadeIn 0.5s ease 0.3s both" }}>
              <h3 style={{ fontSize:"16px", fontWeight:700, marginBottom:"14px" }}>Question Review</h3>
              {examQuestions.slice(0, questionsReached).map((eq, i) => {
                const rc = CATEGORY_COLORS[eq.cat] || "#3b82f6";
                const ri = CATEGORY_ICONS[eq.cat] || "📋";
                const ans = examAnswers[i]?.confidence;
                const isExpanded = expandedReviewIdx === i;
                const confColor = ans === "confident" ? "var(--confident)" : ans === "unsure" ? "#d4b212" : ans === "no-idea" ? "#ef4444" : "var(--t3)";
                const confLabel = ans === "confident" ? "✅" : ans === "unsure" ? "🤔" : ans === "no-idea" ? "❌" : "—";
                return (
                  <div key={i} className="exam-review-item">
                    <button className="exam-review-header" onClick={() => setExpandedReviewIdx(isExpanded ? null : i)}>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"11px", color:"var(--t3)", fontWeight:700, minWidth:"28px" }}>#{i+1}</span>
                      <span style={{ fontSize:"14px" }}>{ri}</span>
                      <span style={{ flex:1, minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontSize:"13px" }}>{eq.q}</span>
                      {eq.isFollowOn && <span style={{ fontSize:"10px", color:"#d4b212", fontFamily:"'Space Mono',monospace", fontWeight:700 }}>FOLLOW-ON</span>}
                      <span style={{ fontSize:"14px" }}>{confLabel}</span>
                      <span style={{ color:"var(--t3)", fontSize:"12px", transition:"transform 0.2s", transform:isExpanded?"rotate(180deg)":"none" }}>▾</span>
                    </button>
                    {isExpanded && (
                      <div className="exam-review-body" style={{ animation:"fadeIn 0.2s ease" }}>
                        <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:`${rc}15`, borderRadius:"8px", padding:"4px 10px", marginBottom:"12px" }}>
                          <span style={{ fontSize:"12px" }}>{ri}</span>
                          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", color:rc, fontWeight:700 }}>{eq.cat}</span>
                        </div>
                        <p style={{ fontSize:"15px", lineHeight:1.6, color:"var(--t1)", marginBottom:"12px" }}>{eq.q}</p>
                        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                          <span style={{ fontSize:"12px" }}>{confLabel}</span>
                          <span style={{ fontSize:"12px", fontWeight:600, color:confColor }}>{ans ? ans.charAt(0).toUpperCase() + ans.slice(1).replace("-", " ") : "Not rated"}</span>
                        </div>
                        {eq.tip && (
                          <div style={{
                            padding:"12px 14px", background:"var(--tip-bg)", border:"1px solid var(--tip-border)",
                            borderRadius:"10px", fontSize:"13px", lineHeight:1.6, color:"var(--t2)"
                          }}>
                            <span style={{ color:theme==="light"?"#d4b212":"#f59e0b", fontWeight:700, fontSize:"11px", fontFamily:"'Space Mono',monospace", letterSpacing:"0.5px" }}>EXAMINER TIP: </span>
                            {eq.tip}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", animation:"fadeIn 0.5s ease 0.4s both" }}>
              <button onClick={() => changeView("exam-setup")} style={{
                flex:1, background:"var(--accent)", color:"#fff", border:"none", borderRadius:"10px",
                padding:"14px 24px", fontSize:"14px", fontWeight:600, cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif", transition:"transform 0.15s", minWidth:"140px"
              }}
              onMouseOver={e=>e.currentTarget.style.transform="translateY(-1px)"}
              onMouseOut={e=>e.currentTarget.style.transform="none"}>
                Try Again
              </button>
              <button onClick={() => changeView("home")} style={{
                flex:1, background:"var(--card)", color:"var(--t2)", border:"1px solid var(--border)", borderRadius:"10px",
                padding:"14px 24px", fontSize:"14px", fontWeight:600, cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s", minWidth:"140px"
              }}
              onMouseOver={e=>e.currentTarget.style.borderColor="var(--t3)"}
              onMouseOut={e=>e.currentTarget.style.borderColor="var(--border)"}>
                Back to Home
              </button>
              <button onClick={practiceWeakFromExam} style={{
                flex:1, background:"var(--card)", color:"var(--review)", border:"1px solid var(--review-border)", borderRadius:"10px",
                padding:"14px 24px", fontSize:"14px", fontWeight:600, cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s", minWidth:"140px"
              }}
              onMouseOver={e=>e.currentTarget.style.background="var(--review-bg)"}
              onMouseOut={e=>e.currentTarget.style.background="var(--card)"}>
                Practice Weak Topics
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // PRACTICE
  const q = pool[idx];
  if (!q) return null;
  const color = CATEGORY_COLORS[q.cat]||"#3b82f6";
  const icon = CATEGORY_ICONS[q.cat]||"📋";

  return (
    <>
      <style>{styles}</style>
      <div data-theme={theme} style={{ fontFamily:"'DM Sans',sans-serif",background:"var(--bg)",minHeight:"100vh",color:"var(--t1)",position:"relative",transition:"background 0.3s, color 0.3s" }}>
        {themeToggle}
        <div style={{ position:"fixed",inset:0,opacity:0.03,zIndex:0, backgroundImage:`radial-gradient(circle at 1px 1px,var(--dot) 1px,transparent 0)`, backgroundSize:"32px 32px" }}/>
        <div className="dark-pattern"/><div className="light-pattern"/>
        <div style={{ position:"fixed",top:0,left:0,right:0,height:"300px", background:`radial-gradient(ellipse at 50% -20%,${color}18 0%,transparent 70%)`, zIndex:0,transition:"background 0.5s" }}/>

        <div key={viewKey} className="practice-container view-enter">
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px" }}>
            <button onClick={()=>{ recordSession(); changeView("home"); }} style={{
              background:"var(--card)",border:"1px solid var(--border)",borderRadius:"8px",
              padding:"8px 16px",color:"var(--t2)",fontSize:"13px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"
            }}>← Topics</button>
            <div style={{ fontFamily:"'Space Mono',monospace",fontSize:"12px",color:"var(--t3)",display:"flex",alignItems:"center",gap:"8px" }}>
              {allBookmarks[noteKey(q)] && <span style={{ fontSize:"12px" }}>BM</span>}
              {allTags[noteKey(q)] && <span className={`tag-dot ${allTags[noteKey(q)] === "confident" ? "confident" : "review"}`}/>}
              {idx + 1} / {pool.length}
            </div>
          </div>

          <div style={{ height:"5px",background:"var(--border)",borderRadius:"3px",marginBottom:"32px",overflow:"hidden" }}>
            <div style={{ height:"100%",width:`${((idx+1)/pool.length)*100}%`,background:color,borderRadius:"3px",transition:"width 0.3s ease,background 0.5s" }}/>
          </div>

          <div className="practice-layout">
            <div className="practice-main">
              <div ref={cardRef} style={{
                background:"var(--card)",border:`1px solid ${color}30`,borderRadius:"16px",
                padding:"32px",marginBottom:"24px",
                animation:"slideIn 0.3s cubic-bezier(0.22,1,0.36,1)",
                boxShadow:`0 4px 40px ${color}08`,
                minHeight:"180px",display:"flex",flexDirection:"column",justifyContent:"center"
              }}>
                <div style={{
                  display:"inline-flex",alignItems:"center",gap:"8px",alignSelf:"flex-start",
                  background:`${color}15`,borderRadius:"8px",padding:"6px 12px",marginBottom:"20px"
                }}>
                  <span style={{fontSize:"14px"}}>{icon}</span>
                  <span style={{ fontFamily:"'Space Mono',monospace",fontSize:"11px",color,fontWeight:700,letterSpacing:"0.5px" }}>{q.cat}</span>
                </div>

                <p style={{ fontSize:"clamp(18px,3.5vw,24px)",fontWeight:500,lineHeight:1.5,color:"var(--t1)" }}>
                  {q.q}
                </p>

                {/* Examiner Tip */}
                {q.tip && (
                  <div style={{ marginTop:"18px" }}>
                    <button onClick={()=>setShowTip(!showTip)} style={{
                      background: showTip ? (theme==="light"?"#d4b21220":"#f59e0b20") : (theme==="light"?"#d4b21210":"#f59e0b10"),
                      border: `1px solid ${theme==="light"?"#d4b21240":"#f59e0b40"}`, borderRadius:"8px",
                      padding:"8px 14px", cursor:"pointer",
                      display:"inline-flex", alignItems:"center", gap:"8px",
                      transition:"all 0.15s", fontFamily:"'DM Sans',sans-serif"
                    }}
                    onMouseOver={e=>e.currentTarget.style.background=theme==="light"?"#d4b21225":"#f59e0b25"}
                    onMouseOut={e=>e.currentTarget.style.background=showTip?(theme==="light"?"#d4b21220":"#f59e0b20"):(theme==="light"?"#d4b21210":"#f59e0b10")}>
                      <span style={{fontSize:"14px"}}>💡</span>
                      <span style={{ fontSize:"12px", fontWeight:600, color:theme==="light"?"#d4b212":"#f59e0b" }}>
                        {showTip ? "Hide Examiner Tip" : "Show Examiner Tip"}
                      </span>
                    </button>
                    {showTip && (
                      <div style={{
                        marginTop:"12px", padding:"14px 16px",
                        background:"var(--tip-bg)", border:"1px solid var(--tip-border)",
                        borderRadius:"10px", fontSize:"14px", lineHeight:1.65,
                        color:"var(--t2)", animation:"fadeIn 0.2s ease"
                      }}>
                        <span style={{ color:theme==="light"?"#d4b212":"#f59e0b", fontWeight:700, fontSize:"12px",
                          fontFamily:"'Space Mono',monospace", letterSpacing:"0.5px"
                        }}>FROM REAL EXAM REPORTS: </span>
                        {q.tip}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Notes section */}
              <div className="notes-section">
                <button className="notes-toggle" onClick={() => setShowNotes(!showNotes)}>
                  <span className="icon">✏️</span>
                  <span className="label">{showNotes ? "Hide My Notes" : "My Notes"}</span>
                  {!showNotes && allNotes[noteKey(q)] && <span className="has-notes"/>}
                </button>
                {showNotes && (
                  <div className="notes-body">
                    <textarea
                      className="notes-textarea"
                      value={noteText}
                      onChange={handleNoteChange}
                      placeholder="Write your answer or notes here... (saved automatically)"
                    />
                    {noteText.trim() && (
                      <div className="notes-saved">Auto-saved to this browser</div>
                    )}
                  </div>
                )}
              </div>

              {/* Confidence tagging */}
              <div className="tag-row">
                <button
                  className={`tag-btn${allBookmarks[noteKey(q)] ? " active-bookmark" : ""}`}
                  onClick={() => toggleBookmark(q)}>
                  <span>{allBookmarks[noteKey(q)] ? "Saved" : "Bookmark"}</span>
                </button>
                <button
                  className={`tag-btn${allTags[noteKey(q)] === "confident" ? " active-confident" : ""}`}
                  onClick={() => toggleTag(q, "confident")}>
                  <span>✅</span> Confident
                </button>
                <button
                  className={`tag-btn${allTags[noteKey(q)] === "review" ? " active-review" : ""}`}
                  onClick={() => toggleTag(q, "review")}>
                  <span>🔄</span> Needs Review
                </button>
                {allTags[noteKey(q)] && (
                  <span style={{ fontSize:"11px", color:"var(--t3)", fontFamily:"'Space Mono',monospace", marginLeft:"4px" }}>
                    Marked as {allTags[noteKey(q)] === "confident" ? "confident" : "needs review"}
                  </span>
                )}
              </div>

              {/* Related questions */}
              <div className="related-section">
                <button className="related-toggle" onClick={() => setShowRelated(!showRelated)}>
                  <span className="icon">🔗</span>
                  <span className="label">{showRelated ? "Hide Related" : "Related Questions"}</span>
                </button>
                {showRelated && (
                  <div className="related-body">
                    {getRelatedQuestions(q, 3).map((rq, ri) => {
                      const rqColor = CATEGORY_COLORS[rq.cat] || "#3b82f6";
                      const rqIcon = CATEGORY_ICONS[rq.cat] || "📋";
                      return (
                        <button key={ri} className="related-card" onClick={() => {
                          // Jump to this question in practice
                          const newPool = [rq, ...pool.filter(p => p.q !== rq.q)];
                          setPool(newPool);
                          setIdx(0);
                          setShowTip(false);
                          setShowRelated(false);
                          setShowNotes(false);
                          loadNoteForQuestion(rq);
                          animateCard();
                        }}>
                          <span style={{ fontSize:"16px", flexShrink:0, marginTop:"2px" }}>{rqIcon}</span>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div className="rq-cat" style={{ color: rqColor, marginBottom:"4px" }}>{rq.cat}</div>
                            <div className="rq-text">{rq.q}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{ display:"flex",gap:"10px" }}>
                <button onClick={prev} disabled={idx===0} style={{
                  flex:1,background:"var(--card)",border:`1px solid ${idx===0?"var(--border)":"var(--t3)"}`,borderRadius:"10px",
                  padding:"14px",color:idx===0?"var(--t3)":"var(--t1)",fontSize:"15px",fontWeight:500,
                  cursor:idx===0?"default":"pointer",fontFamily:"'DM Sans',sans-serif",
                  transition:"all 0.15s",opacity:idx===0?0.35:1
                }}
                onMouseOver={e=>{if(idx>0)e.currentTarget.style.borderColor="var(--t2)"}}
                onMouseOut={e=>e.currentTarget.style.borderColor=idx===0?"var(--border)":"var(--t3)"}>
                  ← Previous
                </button>
                <button onClick={next} style={{
                  flex:1,background:color,border:"none",borderRadius:"10px",
                  padding:"14px",color:"#fff",fontSize:"15px",fontWeight:600,
                  cursor:"pointer",fontFamily:"'DM Sans',sans-serif",
                  transition:"transform 0.15s",boxShadow:`0 4px 20px ${color}30`
                }}
                onMouseOver={e=>e.target.style.transform="translateY(-1px)"}
                onMouseOut={e=>e.target.style.transform="none"}>
                  Next →
                </button>
              </div>

              {/* Mobile shortcuts hint */}
              <div className="shortcuts-hint-mobile">
                Left/Right navigate - Space tip - N notes - C/R tag - B bookmark - Esc back
              </div>
            </div>

            {/* Desktop sidebar - session overview */}
            <div className="practice-sidebar">
              <div style={{
                background:"var(--card)", border:"1px solid var(--border)", borderRadius:"16px",
                padding:"24px", marginBottom:"16px"
              }}>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"11px", letterSpacing:"2px",
                  textTransform:"uppercase", color:"var(--t3)", marginBottom:"16px", fontWeight:700 }}>
                  Session Progress
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:"6px", marginBottom:"16px" }}>
                  <span style={{ fontSize:"36px", fontWeight:700, color, fontFamily:"'Space Mono',monospace" }}>{idx + 1}</span>
                  <span style={{ fontSize:"14px", color:"var(--t3)", fontFamily:"'Space Mono',monospace" }}>/ {pool.length}</span>
                </div>
                <div style={{ height:"4px", background:"var(--border)", borderRadius:"2px", overflow:"hidden", marginBottom:"20px" }}>
                  <div style={{ height:"100%", width:`${((idx+1)/pool.length)*100}%`, background:color, borderRadius:"2px", transition:"width 0.3s" }}/>
                </div>
                <div style={{ fontSize:"13px", color:"var(--t3)", lineHeight:1.6 }}>
                  {Math.round(((idx+1)/pool.length)*100)}% complete
                </div>
              </div>

              {/* Confidence stats */}
              {(() => {
                const cCount = pool.filter(p => allTags[noteKey(p)] === "confident").length;
                const rCount = pool.filter(p => allTags[noteKey(p)] === "review").length;
                return (cCount > 0 || rCount > 0) ? (
                  <div style={{
                    background:"var(--card)", border:"1px solid var(--border)", borderRadius:"16px",
                    padding:"20px 24px", marginBottom:"16px"
                  }}>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"11px", letterSpacing:"2px",
                      textTransform:"uppercase", color:"var(--t3)", marginBottom:"12px", fontWeight:700 }}>
                      Confidence
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                      {cCount > 0 && (
                        <div style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"13px" }}>
                          <span className="tag-dot confident"/>
                          <span style={{ color:theme==="light"?"#2d8a6e":"#10b981", fontWeight:600, fontFamily:"'Space Mono',monospace" }}>{cCount}</span>
                          <span style={{ color:"var(--t3)" }}>confident</span>
                        </div>
                      )}
                      {rCount > 0 && (
                        <div style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"13px" }}>
                          <span className="tag-dot review"/>
                          <span style={{ color:theme==="light"?"#d4b212":"#f59e0b", fontWeight:600, fontFamily:"'Space Mono',monospace" }}>{rCount}</span>
                          <span style={{ color:"var(--t3)" }}>needs review</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null;
              })()}

              <div style={{
                background:"var(--card)", border:"1px solid var(--border)", borderRadius:"16px",
                padding:"24px"
              }}>
                <div className="sidebar-header" onClick={() => setSidebarCollapsed(p => ({ ...p, topics: !p.topics }))}>
                  <span>Topics in Session</span>
                  <span className={`sidebar-chevron${sidebarCollapsed.topics ? " collapsed" : ""}`}>▾</span>
                </div>
                {!sidebarCollapsed.topics && (
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginTop:"16px", animation:"fadeIn 0.2s ease" }}>
                    {[...new Set(pool.map(p => p.cat))].sort().map(cat => {
                      const catColor = CATEGORY_COLORS[cat] || "#3b82f6";
                      const catIcon = CATEGORY_ICONS[cat] || "📋";
                      const isActive = q.cat === cat;
                      return (
                        <div key={cat} style={{
                          display:"flex", alignItems:"center", gap:"8px", padding:"6px 10px",
                          borderRadius:"8px", fontSize:"12px",
                          background: isActive ? `${catColor}15` : "transparent",
                          border: isActive ? `1px solid ${catColor}30` : "1px solid transparent"
                        }}>
                          <span style={{ fontSize:"12px" }}>{catIcon}</span>
                          <span style={{ color: isActive ? catColor : "var(--t3)", fontWeight: isActive ? 600 : 400,
                            flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{cat}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* Keyboard shortcuts */}
              <div style={{
                background:"var(--card)", border:"1px solid var(--border)", borderRadius:"16px",
                padding:"20px 24px", marginTop:"16px"
              }}>
                <div className="sidebar-header" onClick={() => setSidebarCollapsed(p => ({ ...p, shortcuts: !p.shortcuts }))}>
                  <span>⌨ Shortcuts</span>
                  <span className={`sidebar-chevron${sidebarCollapsed.shortcuts ? " collapsed" : ""}`}>▾</span>
                </div>
                {!sidebarCollapsed.shortcuts && (
                  <div style={{ display:"flex", flexDirection:"column", gap:"6px", fontSize:"12px", color:"var(--t3)", marginTop:"12px", animation:"fadeIn 0.2s ease" }}>
                    {[["←→","Navigate"],["Space","Toggle tip"],["N","Notes"],["C","Confident"],["R","Review"],["B","Bookmark"],["Esc","Back"]].map(([key, label]) => (
                      <div key={key} style={{ display:"flex", justifyContent:"space-between" }}>
                        <kbd className="kbd">{key}</kbd>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
