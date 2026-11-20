
# Progress

## Done
- [x] Step 1: HTML skeleton with form and empty list (F1, F2 – layout only)
- [x] Step 2: Basic CSS layout – one column, readable font
- [x] Step 3: Clicking "Add" shows the pair in the list, in memory only (F1, F2)
- [x] Step 4: Empty fields can't be submitted; form clears after adding (F1) – done together with Step 3

## Next
- [x] Step 5: Save and load with localStorage (F4)
- [x] Step 6: Delete button per pair (F3)
- [x] Step 7: "Start practice" button shows one card, English side (F5)
- [x] Step 8: Click card to reveal German (F5)
- [x] Step 9: "Next" shows a random different card (F6)
- [x] Step 10: "I knew it" counter (F7)

## Decisions & notes
- Layout: one column, max width 600px, blue accent colour on the button.
- Pairs are stored in memory as an array of objects: { en: "...", de: "..." }
- The list is re-rendered completely by renderList() after each change.

## Known problems
- (none)