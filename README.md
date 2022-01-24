<h1 align=center> Interstellar Hugo| <a target="_blank" href="https://interstellar-hugo-demo.netlify.app/" rel="nofollow">Demo</a></h1>

<p align=center>
  <a href="https://github.com/gohugoio/hugo/releases/tag/v0.70.0" alt="Contributors">
    <img src="https://img.shields.io/static/v1?label=min-HUGO-version&message=0.70.0&color=f00&logo=hugo" />
  </a>

  <a href="https://github.com/gethugothemes/persian-hugo/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/gethugothemes/persian-hugo" alt="license"></a>

  <a href="https://github.com/gethugothemes/persian-hugo/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/RononDex/interstellar-hugo" alt="contributors"></a>
</p>

---

A [hugo](https://gohugo.io/) theme specifically designed for photography, astronomy and blogging.

This theme is based on the excellent [Persian Hugo Theme](https://github.com/gethugothemes/persian-hugo).

The theme highly focusses on privacy. By default, 0 data from visitors is being captured and all fonts / assets are locally
available (no google cdn or similar is used). It has built in optional support for Google Analytics though.

<p align="center">
  <img src="https://github.com/RononDex/interstellar-hugo/blob/master/images/screenshot.png" alt="screenshot" width="100%">
</p>

---
## Features
- Tile-based image viewer for high-res image zooming
- SVG Overlay on images for annotations
- darkmode / lightmode
- custom shortcodes
- Google analytics  support
- CSS and JS bundle with hugo pipe
- Netlify settings predefine
- Forestry cms pre-configured
- Contact form Support
- Search by fuse.js
- GDPR consent enable
- Open graph meta tag
- Twitter card meta tag

## Switch between darkmode and lightmode
in `config.toml` set
```
[params]

# Turn on darkmode
darkmode = true
```
or 

```
[params]

# Turn off darkmode
darkmode = false
```

## Custom Shortcodes
### Zoomable Image
This theme contains a zoomable image viewer, which loads in tiles from an image based on zoom level. This allows for a
performant zoom of high resolution images in a user friendly way (also supports mobile / touch).

It can be used like this:
```markdown
{{< zoomableimage folderPath="/images/post/ngc6188/">}}
```

The folder given in `folderPath` should lead to a folder on the web, with following contents:
 - `thumb.webp`: A thumbnail (lower resolution, smaller download) to preview the high resolution image (usually 1920x1080
or similar is more than enough).
 - `tiled_photo.dzi`: A deep zoom specification file (can be generated using [vips](https://github.com/libvips/libvips))
 - `tiled_photo_files/`: Folder containing the tiles of the different zoom levels (can be generated using [vips](https://github.com/libvips/libvips))
 - `annotations.svg`: Optional file, containing the overlay for annotations over the photo

A bash script to generate all these files can be found here (only works on linux or WSL (untested)):
[createWebsitePostPhotos](https://github.com/RononDex/dotfiles/blob/master/defaults/.scripts/website/createWebsitePostPhotos)

**Preview:**
<img src="https://github.com/RononDex/interstellar-hugo/blob/master/images/zoomableImagePreview.jpg">

**Viewer:**
<img src="https://github.com/RononDex/interstellar-hugo/blob/master/images/zoomableImageViewer.jpg">

**With Annotations:**
<img src="https://github.com/RononDex/interstellar-hugo/blob/master/images/zoomableImageViewerAnnotations.jpg">

### Image
Displays a centered image inside a post:

Usage:
```
{{< image imageSource="/images/post/post-2.jpg" >}}
```

## Local development

```bash
# clone the repository
git clone https://github.com/RononDex/interstellar-hugo.git

# cd in the project directory
$ cd interstellar-hugo/exampleSite/

# Start local dev server
$ hugo server --themesDir ../..
```
Or Check out [Full Documentation](https://docs.gethugothemes.com/persian/?ref=github).

## Content Management System

[![import to
Forestry](https://assets.forestry.io/import-to-forestryK.svg)](https://app.forestry.io/quick-start?repo=RononDex/interstellar-hugo&engine=hugo&version=0.87.0)

This project has been pre-configured to work with [Forestry](https://forestry.io) a git-based CMS, [import your
repository in Forestry](https://app.forestry.io/quick-start?repo=gethugothemes/persian-hugo&engine=hugo&version=0.87.0) and
you will be able to edit and preview your site ✨.

Any changes you make in Forestry will be committed back to the repo and deployed if you use [Netlify](#netlify).

## Deployment and hosting

[![Deploy to
Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/RononDex/interstellar-hugo)

Follow the steps.

## Prefer a video? (Hugo + Netlify + Forestry)
Build your website with **Interstellar Hugo** theme by following these easy steps (No Coding Required!)
[Video Tutorial](https://youtu.be/ResipmZmpDU).


<!-- licence -->
## License
Copyright &copy; Designed by [Themefisher](https://themefisher.com) & Developed by
[Gethugothemes](https://gethugothemes.com) and [Tino Heuberger](https://theuberger.ch)

**Code License:** Released under the [MIT](https://github.com/RononDex/interstellar-hugo/blob/master/LICENSE) license.

**Image license:** The images are only for demonstration purposes. They have their licenses. We and you don't have permission to
share those images.

<!-- resources -->
## Special Thanks
- [OpenSeaDragon] (https://openseadragon.github.io/)
- [Bootstrap](https://getbootstrap.com)
- [Jquery](https://jquery.com)
- [Themify Icons](https://themify.me/themify-icons)
- [Fuse Js](http://fusejs.io)
- [Mark Js](https://markjs.io/)
- [All Contributors](https://github.com/RononDex/interstellar-hugo/graphs/contributors)
