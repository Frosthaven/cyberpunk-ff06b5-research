# Color Research 2

![Color On The Skin](assets/color-theory-2-header.png){class=no-lightbox}

## Introduction

This is a continuation of [color theory 1](theory-color-1.md). It is expected that
you are coming into this research with a brief understanding of that paper. The
goal of this follow up is to take what we know from color theory and apply the
symbolism used in the game. We will be trying to extract some implementation
details that could reveal more about the game's story.

## The Color Wheel Tattoo

![A broken, leaking color wheel](assets/color-theory-2.png){loading=lazy}

There are many tattoos in the game that hold symbolism. We'll cover those in
greater detail later. For now I want to focus on this one that was brought to
surface attention by the reddit user OniHanzpPT.

There are several key differences in this tattoo that do not exist in previous
discussions:

1. There is an input and an output (red/orange in, yellow out).
2. There is what appears to be an interface tattoo underneath, indicating 7 IO pins.
3. The wheel is missing colors, instead using the existing colors to spread beyond
   the normal confines of a color wheel.
4. Green and cyan are swapped/reversed.

Let's break down these key differences.

## RGB vs CMYK

![RGB vs CMYK](assets/colors-rgb-cmyk.png){loading=lazy}

There are two primary color models that are used: RGB
and CMYK. RGB is used for digital displays, while CMYK is used for printing.

### RGB

Red, green, blue.

- Combine to get white.
- Absence of all colors is black.
- Used for digital displays.
- Additive color model.
- Light defines the color.
- 16.7 million colors.

### CMYK

Cyan, magenta, yellow, key (black).

- Combine to get black.
- Absence of all colors is white.
- Used for printing.
- Subtractive color model.
- Pigment defines the color.
- 16 K colors.

## Tattoo Missing Colors

### What We See

There are 4 base colors on the wheel:

- red (rgb)
- yellow (cmyk)
- cyan (cmyk)
- green (rgb)

And 1 tertiary color:

- orange (red + yellow = corpo fish)

### What We Don't See

By using our knowledge of RGB and CMYK, we can make an educated guess on what
base colors are missing:

- magenta (cmyk)
- blue (rgb)

And tertiary:

- pale blue (tertiary / blue + cyan - corpo fish)

Johnny's side may actually contain more colors, but these are the ones we KNOW
are missing.

### Black and White

While research on this front still needs more work, there are a few promising
angles. First and foremost, the game uses a day and night cycle. This brightness
control gives us some interesting results, where pinks can stand in for oranges
etc (shown in [Dancing Mega Building](research-megabuildings.md)).

I will point out as an addition to this, that V encounters Delamain in a scene
bathed in white before the merge, while Johnny is introduced from a spinning
void of black before the merge.

## Combining The Two Wheels

If we decide to take the tattoo at face value (pun intended), then this paints
an interesting story. The interface contains 7 pins, while all colors from both
sides needs a total of 8 pins.

This is an incompatibility that would overflow the input. If you've
ever tried to plug an HDMI cable into a VGA port, you know what I'm talking
about. The technology just doesn't match up.

This is an interesting echo of the game's story, attempting to merge both
the digital/RGB and the physical/CMYK worlds into a single being.

## Color Clamping

This game uses color clamping quite heavily. This is a technique where the game
will limit the color palette to a specific range. This is done to create a
consistent look and feel by way of lighting and color grading. On a color wheel,
clamping might look something like this:

![Color Clamping](assets/color-clamping.png){loading=lazy}

## Color Artifacting

When trying to rotate an image's hue, you can sometimes get artifacting.
Below I will rotate the hue of Alt to demonstrate this, and then show in-game
cues where this artifacting is present:

Color Artifacting
![This is alt normally](assets/alt-cyberspace.png){loading=lazy data-slider}
![This is alt with a hue shift towards yellow. You will notice the orange/red splotches in the top left of the image - an artifact of hue rotation.](assets/color-artifacting.png){loading=lazy data-slider}
![This is the normal "World" tarot card](assets/color-artifacting-3.png){loading=lazy data-slider}
![This is how V sees it in game post-merge, missing magenta and showing artifacting greens where we expect lime. Could the tarot cards reveal Johnny's true color wheel via these artifacts?](assets/color-artifacting-2.png){loading=lazy data-slider}
![The child drawings are full of this artifacting, particularly in reds, yellows, and blues](assets/child-balloons-by-day.png){loading=lazy data-slider}

## Swapped Colors

@todo snake conversation

## Speculation

I think that this moment of incompatibility - an 8th color - is the backdoor
into the blackwall. With both Songbird losing her memories and always at
risk of being overwritten, and V finding themselves the incompatible bit
and degrading into magenta glitches during DFTR, there is a strong indication
that magenta is specifically the 8th color.

V cannot see magenta on their own. The color wheel is missing the necessary
ingredients from both the RGB range (Red + Missing Blue) and the CMYK range
(Missing magenta outright).

If we were to hazard a solution where V and Johnny can both ride off into the
sunset and live happily ever after, then it would _require_ that V lose one
or more of their colors in the process. Colors that can specifically be made from
the remaining 7 pins.

If we cannot remove magenta (because that is literally the relic keeping V alive),
then we still have many colors on the chopping block.

In an alternative theory, we could echo Delamain's ascension path and create a
new being from a limited subset of our own now-overflowing pallet.

Here are the ones that the game has given to us as changeable:

Black & White
![The city's alleyways can be toggled through floodlights](./assets/white-floodlights.png){loading=lazy data-slider}
![The city's streetlights can be toggled through the hidden button](./assets/white-button.png){loading=lazy data-slider}
![Takemura when rescued returns to graces adorned in white](./assets/white-takemura.png){loading=lazy data-slider}
![Oda when rescued returns to graces adorned in black](./assets/black-oda.png){loading=lazy data-slider}
![Arasaka's white jungle lights can be turned off](./assets/white-jungle.png){loading=lazy data-slider}
![Delamain represents pure white and has multiple outcomes](./assets/delamain-white.jpg){loading=lazy data-slider}

Red = Magenta + Yellow (CMYK)
![Lockdown is indicated in red and can be lifted. Up to and including disabling these lockdown signs.](./assets/red-lockdown.png){loading=lazy data-slider}
![Forklifts can be toggled to block a red light in the base game (Dogtown forklifts have no such red light). Interestingly, their tooltip states "YOU CAN OPEN A PATH THAT IS BLOCKED".](./assets/red-forklifts.png){loading=lazy data-slider}
![Red fire extinguishers can be destroyed](./assets/red-extinguishers.png){loading=lazy data-slider}
![Red radios can be turned on to convert them to cyan](./assets/red-radios.png){loading=lazy data-slider}
![Red explosives can be destroyed](./assets/red-explosives.png){loading=lazy data-slider}

Yellow = Red + Green (RBG)
![The main missions are indicated in yellow](./assets/yellow-missions.png){loading=lazy data-slider}
![Yellow generators can be overloaded](./assets/yellow-generators.png){loading=lazy data-slider}
![The access points with a soft yellow glow do not function like other points. Often found at cyan NCPD locations, these do not cause a world/minimap glitch when completing them. Songbird commends you for finding a hidden path through the parking garage via an access panel that has this same yellow glowing indicator.](./assets/yellow-hacking.png){loading=lazy data-slider}
![You can open yellow exit grates through the ending paths to hide them](./assets/yellow-grate.png){loading=lazy data-slider}

Cyan = Green + Blue (RGB)
![NCPD Missions are indicated in cyan](./assets/cyan-ncpd.png){loading=lazy data-slider}
![Cyan laptop screens can be hidden by closing them](./assets/cyan-laptops.png){loading=lazy data-slider}

Green = Cyan + Yellow (CMYK)
![Gigs are indicated in green](./assets/green-gigs.png){loading=lazy data-slider}
![All but a single green planter in Rogue's ending can be disabled (##06##?)](./assets/green-planters.png){loading=lazy data-slider}
![Green dump lights can be turned red by filling them.](./assets/green-dump.png){loading=lazy data-slider}

Is there a hidden mechanic here, or just a nod? Who knows. But it's a powerful use
of color either way.
