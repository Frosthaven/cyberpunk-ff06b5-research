# Out Of Memory (OOM)

![Title Screen - Cropped](assets/oom-header.png){class=no-lightbox}

This line of research will attempt to show that the game is a memory module we
find mid-corruption due to buffer overflow.

## Just what is Cyberpunk 2077?

When first launching the game, we're faced with the title screen.

![Title Screen](assets/oom-title.png){loading=lazy class=no-lightbox}

### A Quick Aside

There's some interesting color notes we can borrow from [color research 1](./theory-color-1.md) and [color research 2](./theory-color-2.md):

- We know that the title should be represented in yellow and cyan. But, at the
  time of the title screen we have not met Johnny yet who brings blues and yellows.
  As a result, the title can only be rendered as blank/black.
- The bottom left quadrant of the title screen emulates the low-health effect of
  V in-game. We know this should be magenta, but again we don't have Johnny yet
  to blend in blues and thus it can only render in red or cyan. We see it in cyan.

We can also see that the character name is scrambled, with a character level of
18 (the numeric 18 is in the chip to the left of the name, barely visible in red).

### The Data Lifecycle

Displayed prominantly in the center of the screen are 4 data streams scrolling
downward and two cyan arms seeking up and down as if looking for something. By
pressing any button, we can "breach" into this system.

It is there, that with no save files available, we see the datastream and pathing
panels of the title screen isolated:

![No Save Title Screen](assets/oom-payload-upload.png){loading=lazy}

What makes this screen interesting is that it only appears when no save files
exist. The dark magenta data streams here are also going upwards instead of
downwards, signifying that we are breaching into the game and uploading a
payload of our character data.

When we complete the game, the ending credits return us to this screen, but
without the low-health panel and two data streams missing. Fitting for losing
half of your character (V or Johnny) and the struggle at the end of the game.
The bright reds have also blended with the uploaded dark magentas to give an
overall more deep magenta color to the data.

![Ending Title Screen](assets/oom-credits.png){loading=lazy}

Going even further into Phantom Liberty, we see a much more rich magenta at the
end that has taken over the entire screen:

![Phantom Liberty Ending Screen](assets/oom-phantom-liberty.png){loading=lazy}

It seems that our data payload character is causing an impact on the "game" the
longer they are running around, until finally one of the entities is sacrificed
at the end.

We can see this same overtaking of magenta in the game world the longer we play
and the deeper we go into quests and missions. Whether its the bright magenta
lights when jamming with Kerry, or the magenta light on Panam's car, the impact
of our payload becomes evident over time.

![Meeting Panam](assets/oom-panam-1.png){loading=lazy data-slider}
![Kerry Jamming](assets/oom-kerry-1.png){loading=lazy data-slider}
![Kerry Talking](assets/oom-kerry-2.png){loading=lazy data-slider}

### Buffer Overflow

The initial data streams mentioned throughout this article occur in more places
than the title and ending sequences. Sometimes you'll see it in car UIs or even
a full HUD:

![HUD Glitch](assets/oom-hud.png){loading=lazy}

This sequence of numbers seem to indicate a time and two decimal numbers. What
causes them to be offset is a data desynchronization. Because one line doesn't
have the expected number of characters, the whitespace on every line gets
shifted.

If we are the ones who uploaded our character to the module and then saturated
the world in magenta as a result, are we causing this shift? When data flows
past the expected boundary, it can start overwriting other good data and causing
all manner of glitches. This is known as a buffer overflow.

If we reinvestigate the Arasaka 3D score screen, this is exactly what we see:

![Arasaka 3D Score](assets/oom-a3d.png){loading=lazy}

The flaw in the design of the Arasaka 3D arcade game is that it treats scores
as hexidecimal numbers by mistake. The largest integer value is generally seen
as `0xFFFFFFFF`, which is `4294967295` in decimal. If this scoreboard total is
saved under a single space in memory as decimal, then the sequence would look
something like this:

| Name     | Score  | To Decimal  | Size Left (Unsigned Int) |
| -------- | ------ | ----------- | ------------------------ |
| BLCKHND  | 941229 | 9703977     | 4285263318               |
| MRPHY    | 940204 | 19403821    | 4265859497               |
| ARMSMG   | 870312 | 432487219   | 3833372278               |
| ANTVRK   | 110180 | 18024592281 | -14191220003 (overflow)  |
| POLYHSTR | FF06B5 | 16713397    | -18041305678 (magenta)   |

_ARMSMG_ and _ANTVRK_ never made sense as score holders since there are no known characters by those names, but that was probably the point. Polyhistor didn't insert FF06B5 into the game. He likely added the two fake names with large scores in order to force a buffer overflow on the game, which as a result led to FF06B5 and the hidden -10 level (A glitch much like Mario's minus levels).

### Thoughts

It's entirely likely that "Don't Fear (The Reaper)" is a result of us overwhelming the game data with our character - who's time extends beyond what memory would allow. By doing this, we force a buffer overflow that results in a glitchy ending where we storm Arasaka with Johnny. This would explain all of the strange clipping issues and more and justify the missing gaps (where did we get Alt's shard again?).

By going through any deep quest with Panam, Rogue, etc, we can see that Netrunner Operations still has these glitchy aspects and doors labeled "-10BR.OOM.S" etc. Is there a way to get through the game without causing a buffer overflow?
