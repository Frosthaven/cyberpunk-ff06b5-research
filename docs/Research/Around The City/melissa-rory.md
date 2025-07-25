# The Truth About Melissa Rory

![Melissa Rory](assets/rory-header.png){class=no-lightbox}

> The Media Lies

- Regina Jones

## About

Long ago, CDPR released its [first teaser
trailer](https://www.youtube.com/watch?v=P99qJGrPNLs) for Cyberpunk 2077. This
trailer features Maxtac taking a call for the cyberpsycho attack perpetrated by
Melissa Rory. The scene cuts to the game's title before the gun goes off, and
the next scene leads us to believe that she was rehabilitated and assimilated
into Maxtac as an operative.

This is false, and to see why, we need to dive into the frames.

### How it starts

The initial frame before the video begins is this one:

![The first frame](assets/rory-frame-1.png){class=no-lightbox}

Before I go into the sequence of the video, I should probably explain what you
are looking at here since I know I'll get questions about it:

```
:0000 A9 00 AA 20 EF FF 08 8A
:0008 4C 02 00

This is what a 6502-compatible computer
display looks like. It is the same
one used in the The hex above is a program that checks
the display and attachments. For more info
download Raven Microcyb SIM6502.

A link to it is provided in the related
links section of the display

```

This is an 8-bit program that decompiles into the following:

```asm
LDA #$00    ; Load accumulator with 0
TAX         ; Transfer accumulator to X register
JSR $FFEF   ; Jump to subroutine at $FFEF in the system
PHP         ; Push processor status onto the stack
TXA         ; Transfer X register to accumulator
JMP $0002   ; Jump to address $0002
.END

; This program creates an infinite loop, running some 6502 SYS function at
; address $FFEF in the middle of the loop.

```

This solution isn't particularly new, so for now lets focus on the frame image
as the "start".

## Before the Logo Cut

The video is shown in 2 segments. In the first, Melissa is on the street with
a gun to the back of her head. The transition frame is below:

![Transition frame](assets/rory-frame-2.png){class=no-lightbox}

Notice the gun still pointed at her head, barely visible behind the logo.

## After the Logo Cut

Did the gun fire? The next scenes after the logo will convince you that it
didn't, as Melissa is now aboard a Maxtac vehicle, suiting up and putting on a
visor. It would seem she's been completely reformed and out on missions in this
perspective.

![Melissa suiting up](assets/rory-frame-3.png){class=no-lightbox}

## The Problem Frames

At the end of the video we get our coming soon text - but there is a problem.
There are two frames that are out of place. Remember the gun frame just before
the Maxtac visor scene? The visor scene ends with the following frames:

2 Problem Frames
![Somehow we're back at the initial scene, with the gun raised back...](assets/rory-frame-4.png){data-slider}
![...followed by a bright light with the gun in a more forward position.](assets/rory-frame-5.png){data-slider}

Why did we get these two animation frames? Why does the gun seemingly go
forward with a bright light? If it was fired, we'd expect kickback - not
forward momentum. If the gun was never fired, these frames would equally be
impossible.

Furthermore, if the hex code really was just a program that checks the
display, it should only fire once at the beginning, and not mirrored again at
the end.

Unless, like was the case with [Peter Horvath](time-as-a-loop.md#the-second-indicator-peter-horvath), this portion has been cut out, flipped and played backwards.

## Matching the Frames Together

If we reverse the AV/visor scene so that the gun frames are together again and
the order corrected, we get a very different final outcome:

<div class="video-wrapper">
  <iframe style="width:100%; aspect-ratio:16/9;" src="https://www.youtube.com/embed/blEPXxZoO6w?si=fcSBNqq3Uo7ArpuK" frameborder="0" allowfullscreen></iframe>
</div>

Melissa closes her eyes. The Maxtac agent fires, the gun kicking back in bright
light. The moment of death.

The visor reflects the silhouette of her partner finding his seat. Shock and
surprise come across her lips as she takes the now powered down visor off.
Taking a moment to process what just happened, she looks down dejectedly before
the scene fades.

There's plenty of magenta before the visor scene. Did Melissa Rory wake from
the dream? Or did we witness her death? Is our having seen this trailer the
reason her memory carries on in Night City as a Maxtac operator?

One thing's for sure, it seems that on some level Melissa's path mirrors our
own - a one way ticket to the city of dreams measured in calibers.
