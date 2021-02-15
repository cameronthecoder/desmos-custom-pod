# desmos-custom-pod
**This project has been placed in read-only mode. See [this repo](https://github.com/cameronthecoder/desmos-pod) for the updated version**

An interactive version of Desmos made for Adobe Connect.

# Prerequisites

If you want to use this in an Adobe Connect room, you will need to:

- Install the dependencies using `yarn install` or `npm install`.
- Download the Adobe Connect SDK, which can be found on Adobe Connect's website under the [Custom Pods -> Adobe Connect HTML SDK V 2020](https://www.adobe.com/products/adobeconnect/apps.html) link. Once you have downloaded and extracted that file, place the `connect_customPodSDK.js` file in the `public/lib/` folder.
- Create a `breeze-manifest.xml` file inside the `public` folder with these contents:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<breeze-manifest version="1.0" xmlns="http://breeze.macromedia.com/ns/breeze-manifest" generator="ZB">
	<document type="custom-pod" id="com.cameron.coordinateplanepod" version="1.0.001" minimumConnectMobileVersion="2.4" minimumSDKversion="9.4.002" minimumConnectServerVersion="9.4.2"/>
	<assets>
		<asset type="document-view">
			<entry href="CoordinatePlanePod.swf" href-swf="CoordinatePlanePod.swf" href-html5="CoordinatePlanePod_html5.htm" />
			<file href="CoordinatePlanePod.swf"/>
			<file href="CoordinatePlanePod_html5.htm"/>
			<file href="lib/"/>
			<file href="lib/connect_customPodSDK.js"/>
			<file href="_assets"/>
			<file href="_assets/index.js"/>
			<file href="_assets/style.css"/>
		</asset>
	</assets>
</breeze-manifest>
```

- Create a blank `CoordinatePlanePod.swf` file in the `public` folder.

- Build the project by running:

```sh
yarn run build

#OR

npm run build
```

- In the `dist/_assets` folder:
  - Rename `index-{hash}.js` to `index.js`
  - Rename `style-{hash}.js` to `style.css`
- Remove the `/` at the beginning of the paths in the `dist/index.html` file. You will also need to change the paths in the HTML file to match the corresponding files in the `_assets` folder.
- In the HTML file, change `public/lib/connect_customPodSDK.js` to `lib/connect_customPodSDK.js`.
- Rename `dist/index.html` to `CoordinatePlanePod_html5.htm`. **No, that was not a typo, it has to have the `.htm` extension.**
- Compress the `dist` folder into a `.zip` file and upload it into an Adobe Connect share pod. You should see a coordinate plane and an expressions panel to the left.

# License

This project is licensed under the MIT license.

# Contributions

If you have a contribution to make to this project, by all means, please feel free to do so :)
